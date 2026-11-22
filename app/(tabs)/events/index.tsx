import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import EventRow from "../../../src/components/EventRow";
import { useEvents } from "../../../src/hooks/useEvents";
import { useSavedIds } from "../../../src/hooks/useSavedIds";

export default function EventsScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const { savedIds, toggleSaved } = useSavedIds();

  const {
    data: events = [],
    isLoading,
    isError,
    isRefetching,
    error,
    refetch,
  } = useEvents();

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.message}>Loading events...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>

      <Text style={styles.hint}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search events"
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        accessibilityLabel="Search events"
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(event) => String(event.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match.</Text>
        }
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
      />
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
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 18,
    color: "#0F172A",
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  empty: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginTop: 30,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 28,
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
