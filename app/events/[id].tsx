import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const eventId = Number(id);
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.notFound}>Event not found</Text>
        <Text style={styles.value}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.divider} />

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
    padding: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 14,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  notFound: {
    fontSize: 20,
    fontWeight: '600',
    color: '#DC2626',
    textAlign: 'center',
  },
});
