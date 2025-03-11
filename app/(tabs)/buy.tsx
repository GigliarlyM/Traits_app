import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function TabBuyScreen() {
  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 18, backgroundColor: '#1a4a90' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Icon name='arrow-undo-circle' color={'#fff'} size={50} style={{ marginVertical: 'auto' }} />
        </TouchableOpacity>
        <Text style={{
          marginHorizontal: 'auto',
          fontSize: 32,
          color: '#fff',
          fontWeight: 'bold'
          }}>Carrinho</Text>
      </View>

      <ScrollView style={{ height: 460 }}>
        <Text style={styles.text}>Itens</Text>
        <CardArt />
        <CardArt />
        <CardArt />
      </ScrollView>

      <View style={styles.cartBuy}>
        <View style={styles.cartBuyRow}>
          <Text>Subtotal</Text>
          <Text style={styles.cartBuyText}>R$ 30,00</Text>
        </View>

        <View style={styles.cartBuyRow}>
          <Text>Delivery</Text>
          <Text style={styles.cartBuyText}>R$ 25,00</Text>
        </View>

        <View style={styles.cartBuyRow}>
          <Text>Total Cost</Text>
          <Text style={styles.cartBuyText}>R$ 55,00</Text>
        </View>

        <TouchableOpacity style={styles.btnFinal}>
          <Text style={{ color: 'white' }}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CardArt = () => {
  return (
    <View style={styles.containerArt}>
      <View style={styles.cartArt}>
        <Image
          source={require('@/assets/images/gato_oculos.png')}
          style={{ width: 160, height: 160, alignSelf: 'center' }}
        />

        <View style={{ alignItems: 'center', width: 180 }}>
          <Text>Gato de oculos</Text>
          <Text style={{ marginVertical: 'auto', fontSize: 32 }}>R$ 30,00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnFinal: {
    backgroundColor: "#00f",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  cartBuyRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  cartBuyText: {
    textAlign: 'right',
    position: 'absolute',
    right: 0
  },
  cartBuy: {
    backgroundColor: '#ccc',
    position: 'fixed',
    bottom: 47,
    left: 0,
    width: 400,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  containerArt: {
    backgroundColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 13
  },
  cartArt: {
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  }
});
