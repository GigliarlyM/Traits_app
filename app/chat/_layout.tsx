import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (

    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="chatIa" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>

  );
}
