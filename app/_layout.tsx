import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F8FAFC',
        },
        headerTintColor: '#0F172A',
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: '#F8FAFC',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="events/[id]"
        options={{ title: 'Event Details' }}
      />
      <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
    </Stack>
  );
}
