import React, { useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Eldar Ashimov</Text>
      <Text style={styles.counter}>Likes: {likes}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
        onPress={() => setLikes((previous) => previous + 1)}
        accessibilityRole="button"
        accessibilityLabel="Like"
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Link href="/events" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.eventsButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    color: '#334155',
    marginBottom: 32,
  },
  counter: {
    fontSize: 26,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
    marginBottom: 14,
  },
  eventsButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
});
