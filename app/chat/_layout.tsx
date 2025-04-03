import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name='index'
        options={{
          headerShown: true,
          headerTitle: "Chat",
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#1a4a90' },
          contentStyle: { backgroundColor: '#1a4a90' }
        }} />
      <Stack.Screen name='ia' options={{
        headerShown: true,
        headerTitle: "chat com ia",
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: '#1a4a90' },
        contentStyle: { backgroundColor: '#1a4a90' }
      }} />
      <Stack.Screen name='normal' options={{
        headerTitle: "Um doido ae",
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: '#1a4a90' },
        contentStyle: { backgroundColor: '#1a4a90' }
      }} />
    </Stack>
  );
}
