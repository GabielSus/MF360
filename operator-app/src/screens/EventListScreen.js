import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView
} from "react-native";

import axios from "axios";
import BASE_URL from "../services/api";
import EventDetailScreen from "./EventDetailScreen";

export default function EventListScreen() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/list`);
      setEvents(response.data.events || []);
    } catch (error) {
      console.log("Error cargando eventos:", error);
    }
  };

  const createEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert("Aviso", "Escribe el nombre del evento.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/events/create`, {
        eventName: eventName.trim()
      });

      const createdEvent = response.data.event;

      setEventName("");
      setShowCreate(false);
      await loadEvents();
      setSelectedEvent(createdEvent);
    } catch (error) {
      console.log("Error creando evento:", error);
      Alert.alert("Error", "No se pudo crear el evento.");
    } finally {
      setLoading(false);
    }
  };

  if (selectedEvent) {
    return (
      <EventDetailScreen
        eventName={selectedEvent}
        onBack={() => {
          setSelectedEvent(null);
          loadEvents();
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>MFproducciones</Text>
      <Text style={styles.title}>Eventos</Text>

      {!showCreate ? (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowCreate(true)}
        >
          <Text style={styles.primaryButtonText}>+ Crear nuevo evento</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.createBox}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del evento"
            placeholderTextColor="#777"
            value={eventName}
            onChangeText={setEventName}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setShowCreate(false);
                setEventName("");
              }}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={createEvent}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Creando..." : "Crear"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={events}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedEvent(item)}
          >
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay eventos creados</Text>
        }
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

  logo: {
    color: "#2196F3",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    paddingTop: 60,
    paddingBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20
  },

  primaryButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },

  createBox: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20
  },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16
  },

  row: {
    flexDirection: "row",
    gap: 10
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#444",
    padding: 14,
    borderRadius: 12
  },

  createButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 12
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },

  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },

  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 40
  }
});