import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default function QrReadyScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                ✅ Video Procesado
            </Text>

            <Text style={styles.subtitle}>
                QR listo para el cliente
            </Text>

            <View style={styles.qrBox}>
                <Text>QR</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Compartir
                </Text>
            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },

    subtitle: {
        color: "#999",
        marginTop: 10,
        marginBottom: 20
    },

    qrBox: {
        width: 200,
        height: 200,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },

    button: {
        backgroundColor: "#2196F3",
        marginTop: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }

});