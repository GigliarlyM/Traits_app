import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { CartProvider } from '@/components/CartContext';
import MenuHeader from '@/components/MenuHeader';
import { PaperProvider } from 'react-native-paper';

export default function TabLayout() {
  // Direcionar o usuario para tela de login caso ele nao tenha a chave de autenticacao

  return (
    <CartProvider>
      <PaperProvider>
        <Tabs
          screenOptions={{
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
              title: 'Artes 😀',
              tabBarIcon: ({ color }) => <Icon size={28} name="image-frame" color={color} />,
              headerLeft: () => <MenuHeader />,
              headerStyle: { backgroundColor: '#1a4a90' },
              headerTitleStyle: { color: '#fff', marginLeft: 50, fontSize: 32, fontWeight: 'bold' }
            }}
          />
          <Tabs.Screen
            name="buy"
            options={{
              title: 'Carrinho 🤔',
              tabBarIcon: ({ color }) => <IconFeather size={28} name="shopping-cart" color={color} />,
              headerLeft: () => <MenuHeader />,
              headerStyle: { backgroundColor: '#1a4a90' },
              headerTitleStyle: { color: '#fff', marginLeft: 50, fontSize: 32, fontWeight: 'bold' }
            }}
          />
        </Tabs>
      </PaperProvider>
    </CartProvider>
  );
}
