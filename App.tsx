import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>
        Hello, World!
      </Text>

      <Text style={styles.name}>
        Eldar Ashimov
      </Text>

      <Text style={styles.counter}>
        Likes: {likes}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => setLikes((previous) => previous + 1)}
        accessibilityRole="button"
        accessibilityLabel="Like"
      >
        <Text style={styles.buttonText}>
          Like
        </Text>
      </Pressable>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
