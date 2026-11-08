import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import EventRow from '../../../src/components/EventRow';
import { events } from '../../../src/data/events';

export default function EventsScreen() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSaved = (id: number) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>

      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
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
        data={events.filter((event) =>
          event.title.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match.</Text>
        }
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
    backgroundColor: '#F8FAFC',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 18,
    color: '#0F172A',
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  empty: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
  },
});
