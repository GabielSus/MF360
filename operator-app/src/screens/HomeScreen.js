import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default function HomeScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                MF360 Operator
            </Text>

            <Text style={styles.subtitle}>
                Sistema de Cabina 360
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f0f"
    },

    title: {
        fontSize: 32,
        color: "#ffffff",
        fontWeight: "bold"
    },

    subtitle: {
        marginTop: 10,
        color: "#cccccc",
        fontSize: 16
    }

});