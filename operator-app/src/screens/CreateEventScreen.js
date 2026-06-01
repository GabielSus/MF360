import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert
} from "react-native";

import axios from "axios";

import BASE_URL from "../services/api";

export default function CreateEventScreen() {

    const [eventName, setEventName] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    const createEvent = async () => {

        if (!eventName.trim()) {
            Alert.alert("Campo requerido", "Escribe el nombre del evento.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${BASE_URL}/events/create`,
                {
                    eventName: eventName.trim()
                }
            );

            setActiveEvent(response.data.event);

            Alert.alert(
                "Evento creado",
                `Evento activo: ${response.data.event}`
            );

            setEventName("");

        } catch (error) {

            Alert.alert(
                "Error",
                "No se pudo crear el evento. Revisa que el backend esté encendido."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.logo}>
                MFproducciones
            </Text>

            <Text style={styles.title}>
                Crear Evento
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del evento"
                placeholderTextColor="#999"
                value={eventName}
                onChangeText={setEventName}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={createEvent}
                disabled={loading}
            >

                {
                    loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            Crear Evento
                        </Text>
                    )
                }

            </TouchableOpacity>

            {
                activeEvent && (
                    <View style={styles.activeBox}>
                        <Text style={styles.activeLabel}>
                            Evento activo
                        </Text>

                        <Text style={styles.activeEvent}>
                            {activeEvent}
                        </Text>
                    </View>
                )
            }

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        padding: 24
    },

    logo: {
        color: "#208AEF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12
    },

    title: {
        fontSize: 36,
        color: "white",
        textAlign: "center",
        marginBottom: 30
    },

    input: {
        width: "100%",
        backgroundColor: "#222",
        color: "white",
        padding: 18,
        borderRadius: 14,
        marginBottom: 20,
        fontSize: 16
    },

    button: {
        backgroundColor: "#208AEF",
        padding: 18,
        borderRadius: 14,
        width: "100%"
    },

    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },

    activeBox: {
        marginTop: 30,
        backgroundColor: "#1c1c1c",
        padding: 18,
        borderRadius: 14
    },

    activeLabel: {
        color: "#999",
        fontSize: 14,
        marginBottom: 6
    },

    activeEvent: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }

});