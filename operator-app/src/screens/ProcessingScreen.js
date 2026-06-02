import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default function ProcessingScreen() {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                ⚙ Procesando Video...
            </Text>

            <Text style={styles.subtitle}>
                Aplicando efectos y generando QR
            </Text>

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
        marginTop: 10
    }

});