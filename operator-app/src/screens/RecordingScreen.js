import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import ProcessingScreen from "./ProcessingScreen";
import QrReadyScreen from "./QrReadyScreen";

export default function RecordingScreen({ eventName }) {

    const [counter, setCounter] = useState(3);
    const [processing, setProcessing] = useState(false);
    const [qrReady, setQrReady] = useState(false);

    useEffect(() => {

        if (counter <= 0) return;

        const timer = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [counter]);

    if (processing) {

        setTimeout(() => {
            setQrReady(true);
        }, 3000);

        return <ProcessingScreen />;
    }

    if (qrReady) {
        return <QrReadyScreen />;
    }

    return (

        <View style={styles.container}>

            <Text style={styles.event}>
                {eventName}
            </Text>

            {
                counter > 0 ? (
                    <Text style={styles.counter}>
                        {counter}
                    </Text>
                ) : (
                    <>
                        <Text style={styles.recording}>
                            🎥 GRABANDO
                        </Text>

                        <TouchableOpacity
                            style={styles.stopButton}
                            onPress={() => setProcessing(true)}
                        >
                            <Text style={styles.stopText}>
                                ⏹ Detener Grabación
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }

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

    event: {
        color: "#fff",
        fontSize: 20,
        marginBottom: 30
    },

    counter: {
        color: "#fff",
        fontSize: 120,
        fontWeight: "bold"
    },

    recording: {
        color: "red",
        fontSize: 40,
        fontWeight: "bold"
    },

    stopButton: {
        backgroundColor: "#ff4d4d",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 30
    },

    stopText: {
        color: "#fff",
        fontWeight: "bold"
    }

});