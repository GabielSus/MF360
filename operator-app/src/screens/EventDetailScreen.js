import React, { useState, useEffect } from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";

import CameraScreen from "./CameraScreen";
import VideoListScreen from "./VideoListScreen";
import VideoApi from "../services/videoApi";

export default function EventDetailScreen({ eventName, onBack }) {
  const [showCamera, setShowCamera] = useState(false);
  const [showVideoList, setShowVideoList] = useState(false);
  const [videosCount, setVideosCount] = useState(0);

  useEffect(() => {
    loadVideosCount();
  }, []);

  const loadVideosCount = async () => {
    try {
      const count = await VideoApi.getVideosCount(eventName);
      setVideosCount(count);
    } catch (error) {
      console.log("Error obteniendo videos:", error);
    }
  };

  if (showCamera) {
    return (
      <CameraScreen
        eventName={eventName}
        onBack={() => {
          setShowCamera(false);
          loadVideosCount();
        }}
      />
    );
  }

  if (showVideoList) {
    return (
      <VideoListScreen
        eventName={eventName}
        onBack={() => {
          setShowVideoList(false);
          loadVideosCount();
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Volver a eventos</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Evento activo</Text>
      <Text style={styles.title}>{eventName}</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.cardText}>📹 Iniciar grabación</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setShowVideoList(true)}
      >
        <Text style={styles.cardText}>🎞 Videos ({videosCount})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>🔳 QR generados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>📊 Estadísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>⚙ Configuración</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.danger]}>
        <Text style={styles.cardText}>🛑 Finalizar evento</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 20
  },

  backButton: {
    marginBottom: 20
  },

  backText: {
    color: "#2196F3",
    fontSize: 16,
    paddingTop: 60,
    fontWeight: "bold"
  },

  label: {
    color: "#999",
    fontSize: 14,
    marginBottom: 6
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25
  },

  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12
  },

  danger: {
    borderWidth: 1,
    borderColor: "#ff4d4d"
  },

  cardText: {
    color: "#fff",
    fontSize: 18
  }
});