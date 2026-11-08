import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>

      <Link href="/" style={styles.link}>
        Go home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 20,
  },
  link: {
    fontSize: 17,
    color: '#2563EB',
    fontWeight: '600',
  },
});
