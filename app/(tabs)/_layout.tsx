import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { CartProvider } from '@/components/CartContext';

export default function TabLayout() {

  return (
    <CartProvider>
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
        <Tabs.Screen
          name="buy"
          options={{
            title: 'Carrinho',
            tabBarIcon: ({ color }) => <IconFeather size={28} name="shopping-cart" color={color} />,
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
