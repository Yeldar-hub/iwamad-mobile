import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onLongPress,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      accessibilityRole="button"
      accessibilityLabel={`${event.title}${saved ? ', saved' : ''}`}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subtitle}>
          {event.date} · {event.place}
        </Text>
        {saved && <Text style={styles.saved}>★ Saved</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  saved: {
    marginTop: 8,
    color: '#15803D',
    fontSize: 14,
    fontWeight: '700',
  },
});
