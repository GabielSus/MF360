import React, { useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions
} from "expo-camera";

import { Video } from "expo-av";
import VideoApi from "../services/videoApi";

export default function CameraScreen({ eventName, onBack }) {
  const cameraRef = useRef(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [countdown, setCountdown] = useState(null);

  if (!cameraPermission || !microphonePermission) {
    return null;
  }

  const requestPermissions = async () => {
    await requestCameraPermission();
    await requestMicrophonePermission();
  };

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>MF360 necesita permisos</Text>

        <TouchableOpacity style={styles.smallButton} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Permitir cámara y micrófono</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startCountdown = () => {
    setCountdown(2);

    setTimeout(() => setCountdown(1), 1000);

    setTimeout(() => {
      setCountdown(null);
      startRecording();
    }, 2000);
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;

    try {
      setRecording(true);

      const video = await cameraRef.current.recordAsync({
        maxDuration: 10
      });

      console.log("VIDEO GRABADO:", video);
      setVideoUri(video.uri);
    } catch (error) {
      console.log("ERROR GRABANDO:", error);
    } finally {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current) return;
    cameraRef.current.stopRecording();
  };

  const repeatRecording = () => {
    setVideoUri(null);
  };

  const uploadRecordedVideo = async () => {
    if (!videoUri) return;

    try {
      setUploading(true);

      console.log("SUBIENDO VIDEO AL EVENTO:", eventName);

      const result = await VideoApi.uploadVideo(eventName, videoUri);

      console.log("VIDEO SUBIDO:", result);

      Alert.alert("Éxito", `Video subido al evento: ${eventName}`);

      setVideoUri(null);
      onBack();
    } catch (error) {
      console.log("ERROR SUBIENDO:", error);

      if (error.response) {
        console.log("SERVER RESPONSE:", error.response.data);
      }

      Alert.alert("Error", "No se pudo subir el video");
    } finally {
      setUploading(false);
    }
  };

  if (videoUri) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={repeatRecording}>
            <Text style={styles.backText}>← Repetir</Text>
          </TouchableOpacity>

          <Text style={styles.eventText}>{eventName}</Text>
        </View>

        <Video
          source={{ uri: videoUri }}
          style={styles.preview}
          useNativeControls
          resizeMode="contain"
          shouldPlay
        />

        {uploading ? (
          <View style={styles.bottomBar}>
            <Text style={styles.buttonText}>☁ Subiendo video...</Text>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.repeatButton}
              onPress={repeatRecording}
            >
              <Text style={styles.buttonText}>🔄 Repetir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={uploadRecordedVideo}
            >
              <Text style={styles.buttonText}>☁ Subir</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} mode="video" />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backText}>← Cancelar</Text>
          </TouchableOpacity>

          <Text style={styles.eventText}>{eventName}</Text>
        </View>

        {countdown && (
          <View style={styles.countdownBox}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}

        <View style={styles.controls}>
          {!recording ? (
            <TouchableOpacity style={styles.recordButton} onPress={startCountdown}>
              <Text style={styles.recordIcon}>●</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
              <Text style={styles.stopIcon}>■</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },

  camera: {
    flex: 1
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },

  topBar: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    backgroundColor: "rgba(0,0,0,0.45)"
  },

  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },

  eventText: {
    color: "#ddd",
    fontSize: 14
  },

  controls: {
    alignItems: "center",
    paddingBottom: 35
  },

  recordButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ff3b3b"
  },

  recordIcon: {
    color: "#ff3b3b",
    fontSize: 38
  },

  stopButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#ff3b3b",
    justifyContent: "center",
    alignItems: "center"
  },

  stopIcon: {
    color: "#fff",
    fontSize: 30
  },

  countdownBox: {
    position: "absolute",
    top: "38%",
    left: 0,
    right: 0,
    alignItems: "center"
  },

  countdownText: {
    color: "#fff",
    fontSize: 120,
    fontWeight: "bold"
  },

  preview: {
    flex: 1,
    backgroundColor: "#000"
  },

  actions: {
    flexDirection: "row"
  },

  repeatButton: {
    flex: 1,
    backgroundColor: "#444",
    padding: 18,
    alignItems: "center"
  },

  uploadButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 18,
    alignItems: "center"
  },

  bottomBar: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    alignItems: "center"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  smallButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});