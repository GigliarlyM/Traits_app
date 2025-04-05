import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home' options={{contentStyle: {backgroundColor: "#1a4a90"}}} />
        <Stack.Screen name='normal' options={{contentStyle: {backgroundColor: "#1a4a90"}}} />
        <Stack.Screen name='chatIa' options={{contentStyle: {backgroundColor: "#1a4a90"}}} />
    </Stack>
  );
}
