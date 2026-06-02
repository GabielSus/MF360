import React, { useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions
} from "expo-camera";

import { uploadVideo } from "../services/videoService";

export default function CameraScreen() {

  const cameraRef = useRef(null);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  const [recording, setRecording] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  if (!cameraPermission || !microphonePermission) {
    return null;
  }

  const requestPermissions = async () => {

    await requestCameraPermission();

    await requestMicrophonePermission();

  };

  if (
    !cameraPermission.granted ||
    !microphonePermission.granted
  ) {

    return (
      <View style={styles.center}>

        <Text style={styles.title}>
          MF360 necesita permisos
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermissions}
        >
          <Text style={styles.text}>
            Permitir cámara y micrófono
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  const startRecording = async () => {

    if (!cameraRef.current) return;

    try {

      setRecording(true);

      const video =
        await cameraRef.current.recordAsync({
          maxDuration: 10
        });

      console.log("VIDEO GRABADO:", video);

      setUploading(true);

      console.log("SUBIENDO VIDEO...");

      const result =
        await uploadVideo(
          "graduacion_uvg",
          video.uri
        );

      console.log(
        "VIDEO SUBIDO:",
        result
      );

      Alert.alert(
        "Éxito",
        "Video subido correctamente"
      );

    } catch (error) {

      console.log(
        "ERROR:",
        error
      );

      if (error.response) {

        console.log(
          "SERVER RESPONSE:",
          error.response.data
        );

      }

    } finally {

      setRecording(false);
      setUploading(false);

    }

  };

  const stopRecording = () => {

    if (!cameraRef.current) return;

    cameraRef.current.stopRecording();

  };

  return (

    <View style={styles.container}>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        mode="video"
      />

      {
        uploading ? (

          <View style={styles.uploadingBox}>

            <Text style={styles.text}>
              ☁ Subiendo video...
            </Text>

          </View>

        ) : !recording ? (

          <TouchableOpacity
            style={styles.button}
            onPress={startRecording}
          >
            <Text style={styles.text}>
              🎥 Grabar
            </Text>
          </TouchableOpacity>

        ) : (

          <TouchableOpacity
            style={styles.stopButton}
            onPress={stopRecording}
          >
            <Text style={styles.text}>
              ⏹ Detener
            </Text>
          </TouchableOpacity>

        )
      }

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
    marginBottom: 20,
    textAlign: "center"
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 20,
    alignItems: "center"
  },

  stopButton: {
    backgroundColor: "#ff4d4d",
    padding: 20,
    alignItems: "center"
  },

  uploadingBox: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    alignItems: "center"
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }

});