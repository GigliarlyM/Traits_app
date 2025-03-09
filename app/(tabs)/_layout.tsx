import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Artes',
          tabBarIcon: ({ color }) => <Icon size={28} name="image-frame" color={color} />,
        }}
      />
    </Tabs>
  );
}
