import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { ArtView, ComponetArtProp } from '@/components/ArtView';
import { Description } from '@/components/description';

export default function TabArtScreen() {
  const [modalVisivel, setModelVisivel] = useState(false)
  const [arteSelecionada, setArteSelecionada] = useState<ComponetArtProp | null>(null)

  const abrirModal = (arteSelt: ComponetArtProp) => {
    setArteSelecionada(arteSelt)
    setModelVisivel(true)
  }

  const fecharModal = () => {
    setModelVisivel(false)
    setArteSelecionada(null)
  }

  const searchArts = (quantidade = 5) => {
    // Simulando a chamada à API
    return Array(quantidade).fill(null).map((_, index) => ({
      id: index + 1,
      title: `Art ${index + 1}`,
      image: '@/assets/images/gato_com_oculos_perfil.avif',
      saled: index % 2 === 0,
      valueArt: index * 10 + 100, // Valor de compra do artigo, simulado
    }));
  }

  const arts = searchArts();

  const convertListToView = () => {
    return arts.map((art) => (
      <ArtView
        key={art.id}
        title={art.title}
        image={art.image}
        saled={art.saled}
        valueArt={art.valueArt}
        onPress={() => abrirModal(art)}
      />
    ));
  }

  return (
    <ScrollView style={{ paddingTop: 50, paddingHorizontal: 18, backgroundColor: '#1a4a90' }}>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <TouchableOpacity>
          <IconSimpleLine
            name='options-vertical'
            size={30} color="#000"
            style={{ marginVertical: 'auto', marginHorizontal: 8 }}
          />
        </TouchableOpacity>

        <Text style={styles.titleScreen}>ARTES</Text>

        <TouchableOpacity style={styles.btnWallet}>
          <Icon
            name='wallet-outline'
            size={30} color="#000"
            style={{ marginVertical: 'auto', marginHorizontal: 8 }} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.titleText}>Selecione a categoria</Text>

        <ScrollView horizontal style={{ marginVertical: 20 }}>
          <TouchableOpacity style={styles.btnOption}>
            <Text>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnOption, styles.btnOptionSelected]}>
            <Text style={{ color: 'white' }}>Populares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <Text>Ofertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <Text>Especiais</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View>
        <Text style={styles.titleText}>Populares</Text>
        <ScrollView horizontal>
          {convertListToView()}
        </ScrollView>
      </View>

      <View>
        <Text style={styles.titleText}>Ofertas</Text>
        <View style={styles.offerArt}>
          <View style={{ alignSelf: 'center' }}>
            <Text>Desconto da semana</Text>
            <Text style={styles.textOff}>15% OFF</Text>
            <Link href='/auth/login'>
              <Text >Go to login screen!</Text>
            </Link>
          </View>
          <Image
            source={require('@/assets/images/gato_oculos.png')}
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
        </View>
      </View>

      <Modal visible={modalVisivel} animationType="slide">
        <Description art={arteSelecionada!} onExit={fecharModal} />
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnOptionSelected: {
    backgroundColor: '#00f'
  },
  btnOption: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    padding: 5,
    marginRight: 10
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
  textOff: {
    color: "#ff0",
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 5
  },
  titleText: {
    fontSize: 22,
    color: "#eee",
    marginVertical: 10
  },
  offerArt: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 40
  },
  btnSale: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 10
  }
});
