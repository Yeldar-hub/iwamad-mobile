import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useEvents } from "../../src/hooks/useEvents";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useEvents();

  const event = events.find((item) => item.id === Number(id));

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.message}>Loading event...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.message}>
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => refetch()}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text style={styles.message}>
          No event with id {id}.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{event.title}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{event.date}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{event.place}</Text>

        <Text style={styles.label}>Available seats</Text>
        <Text style={styles.value}>{event.seats}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 28,
    minHeight: 44,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
