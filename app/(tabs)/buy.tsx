import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useCart } from '@/components/CartContext';
import { ComponetArtProp } from '@/components/ArtView';

export default function TabBuyScreen() {
  const { cart, removeFromCart } = useCart()
  const total = getTotal(cart)

  return (
    <ScrollView style={{ paddingTop: 50, backgroundColor: '#1a4a90' }}>
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

      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={[styles.text, { fontSize: 28 }]}>Itens</Text>
        {convertListToView(cart, removeFromCart)}
      </ScrollView>

      <View style={styles.cartBuy}>
        <View style={styles.cartBuyRow}>
          <Text style={styles.cartBuyText}>Subtotal</Text>
          <Text style={[styles.cartBuyTextRight, styles.cartBuyText]}>R$ {total}</Text>
        </View>

        <View style={styles.cartBuyRow}>
          <Text style={styles.cartBuyText}>Delivery</Text>
          <Text style={[styles.cartBuyTextRight, styles.cartBuyText]}>R$ 25,00</Text>
        </View>

        <View style={styles.cartBuyRow}>
          <Text style={styles.cartBuyTextTotal}>Total Cost</Text>
          <Text style={[styles.cartBuyTextRight, styles.cartBuyTextTotal]}>R$ {total + 25}</Text>
        </View>

        <TouchableOpacity style={styles.btnFinal}>
          <Text style={{ color: 'white' }}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const convertListToView = (arts: ComponetArtProp[], removeArt: (art: ComponetArtProp) => void) => {

  return arts.map((art) => (
    <CardArt title={art.title} image={art.image} valueArt={art.valueArt} removeArt={removeArt} />
  ));
}

const CardArt: React.FC<ComponetArtProp & {removeArt: (art: ComponetArtProp) => void}> = (props) => {
  const {title, valueArt, removeArt} = props

  return (
    <View style={styles.containerArt}>

      <TouchableOpacity style={styles.btnTrash} onPress={() => removeArt({title, valueArt})}>
        <Icon name='trash-outline' color={'#000'} size={30} />
      </TouchableOpacity>

      <View style={styles.cartArt}>
        <Image
          source={require('@/assets/images/gato_oculos.png')}
          style={{ width: 160, height: 160, alignSelf: 'center' }}
        />

        <View style={{ alignItems: 'center', width: 180 }}>
          <Text>{title}</Text>
          <Text style={{ marginVertical: 'auto', fontSize: 32 }}>R$ {valueArt}</Text>
        </View>
      </View>
    </View>
  );
}

const getTotal = (arts: ComponetArtProp[]) => {
  let total = 0;

  if (arts.length > 0) {
    total = arts.map((art) => art.valueArt).reduce((value1, value2=0) => value1! + value2)!
    console.log(total)
  }

  return total
}

const styles = StyleSheet.create({
  btnTrash: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
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
  cartBuyTextTotal: {
    color: "#00f",
    fontWeight: 'bold',
    fontSize: 16
  },
  cartBuyText: {
    color: "#777",
    fontSize: 14,
    fontWeight: 'bold'
  },
  cartBuyTextRight: {
    textAlign: 'right',
    position: 'absolute',
    right: 0,
  },
  cartBuy: {
    backgroundColor: '#ccc',
    marginBottom: 50,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  containerArt: {
    backgroundColor: '#999',
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
