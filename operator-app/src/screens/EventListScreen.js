import React, { useEffect, useState } from "react";
import EventDetailScreen from "./EventDetailScreen";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import axios from "axios";

import BASE_URL from "../services/api";

export default function EventListScreen() {

const [events, setEvents] = useState([]);
const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/events/list`
            );

            setEvents(response.data.events);

        } catch (error) {

            console.log("Error cargando eventos:", error);

        }

    };

    const renderEvent = ({ item }) => (

        <TouchableOpacity
    style={styles.card}
    onPress={() => setSelectedEvent(item)}
>
            <Text style={styles.cardText}>
                {item}
            </Text>

        </TouchableOpacity>

    );
    
if (selectedEvent) {
    return (
        <EventDetailScreen
            eventName={selectedEvent}
        />
    );
}
    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Eventos
            </Text>

            <FlatList
                data={events}
                keyExtractor={(item) => item}
                renderItem={renderEvent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No hay eventos creados
                    </Text>
                }
            />

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
        color: "#ffffff",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20
    },

    card: {
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 15,
        marginBottom: 12
    },

    cardText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600"
    },

    emptyText: {
        color: "#999",
        textAlign: "center",
        marginTop: 40
    }

});