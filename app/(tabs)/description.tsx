import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMatiral from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function TabDescriptionScreen() {
  return (
    <ScrollView style={{ paddingTop: 50, paddingHorizontal: 18, backgroundColor: '#1a4a90' }}>
      <View>

        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <TouchableOpacity>
            <IconIon name='arrow-undo-circle' color={'#fff'} size={65} style={{ alignSelf: 'center', marginVertical: 'auto' }} />
          </TouchableOpacity>

          <Text style={styles.titleScreen}>Arte</Text>

          <TouchableOpacity style={styles.btnWallet}>
            <IconIon
              name='wallet-outline'
              size={30} color="#000"
              style={{ marginVertical: 'auto', marginHorizontal: 8 }} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.text, styles.textFocus]}>Titulo da Arte</Text>
        <Text style={styles.text}>Genero ou forma de pintura</Text>
        <Text style={[styles.text, styles.textFocus]}>R$ 30,00</Text>

        <Image
          source={require('@/assets/images/gato_oculos.png')}
          style={styles.image}
        />

        <Text style={[styles.text, { color: '#ccc', fontSize: 15 }]}>Descricao sobre a arte. Contando a historia por tras do quadro...</Text>
        <Text style={[styles.text, styles.textLink]}>Link que eu espero que o usuario nao clique</Text>
      </View>

      <View style={styles.features}>
        <View>
          <TouchableOpacity style={styles.btn}>
            {/* heart -> para o coracao preenchido */}
            <IconAnt name='hearto' size={45} style={{ marginVertical: 'auto' }} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.btnAdd}>
            <IconMatiral name='shopping-outline' size={45} color={'white'} />
            <Text style={[styles.text, styles.textBtn]}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textLink: {
    color: "#fff",
    fontSize: 14,
    textAlign: 'right',
    textDecorationLine: 'underline'
  },
  features: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 60
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 40
  },
  textBtn: {
    marginLeft: 10,
    fontWeight: 'bold',
    marginVertical: 'auto'
  },
  textFocus: {
    color: "yellow",
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 24
  },
  btnAdd: {
    flexDirection: 'row',
    marginLeft: 10,
    backgroundColor: "#00f",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    elevation: 4,
    marginBottom: 20
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
  btnWallet: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 56,
    height: 56,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    padding: 5
  },
  titleScreen: {
    fontSize: 32,
    color: '#eee',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
})