import React from "react";
import RecordingScreen from "./RecordingScreen";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default function EventDetailScreen({ eventName }) {
const [showRecording, setShowRecording] = React.useState(false);
const [isRecording, setIsRecording] = React.useState(false);

if (showRecording) {
    return <RecordingScreen eventName={eventName} />;
}

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                {eventName}
            </Text>

            <TouchableOpacity
    style={styles.card}
    onPress={() => setShowRecording(true)}>
                <Text style={styles.cardText}>
                    📹 Iniciar Grabación
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                    🎞 Videos
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                    🔳 QR Generados
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                    📊 Estadísticas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                    ⚙ Configuración
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.card, styles.danger]}
            >
                <Text style={styles.cardText}>
                    🛑 Finalizar Evento
                </Text>
            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0f0f0f",
        padding: 20
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25
    },

    card: {
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 15,
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