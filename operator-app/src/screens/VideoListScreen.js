import React, { useEffect, useState } from "react";

import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView
} from "react-native";

import BASE_URL from "../services/api";
import VideoApi from "../services/videoApi";

export default function VideoListScreen({ eventName, onBack }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const result = await VideoApi.getVideos(eventName);
      console.log("VIDEOS RECIBIDOS:", result);
      setVideos(result);
    } catch (error) {
      console.log("ERROR CARGANDO VIDEOS:", error);
    }
  };

  const openVideo = (videoName) => {
    const url = `${BASE_URL}/videos/${eventName}/${videoName}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Volver al evento</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Videos</Text>

      <Text style={styles.subtitle}>Evento: {eventName}</Text>

      <Text style={styles.counter}>Total: {videos.length}</Text>

      <FlatList
        data={videos}
        keyExtractor={(item) => item}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay videos en este evento</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openVideo(item)}
          >
            <Text style={styles.videoText}>🎥 {item}</Text>
            <Text style={styles.hint}>Tocar para reproducir</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 20
  },

  back: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 50,
    marginBottom: 20
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },

  subtitle: {
    color: "#aaa",
    marginTop: 8
  },

  counter: {
    color: "#2196F3",
    marginTop: 8,
    marginBottom: 20,
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10
  },

  videoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },

  hint: {
    color: "#999",
    marginTop: 6,
    fontSize: 12
  },

  empty: {
    color: "#999",
    marginTop: 40,
    textAlign: "center"
  }
});