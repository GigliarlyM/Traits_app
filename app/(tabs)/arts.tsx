import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import React from 'react';

export default function TabArtScreen() {
  return (
    <ScrollView style={{ paddingTop: 50, paddingHorizontal: 18, backgroundColor: '#00f' }}>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <TouchableOpacity style={{}}>
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

        <ScrollView horizontal style={{marginVertical: 20}}>
          <TouchableOpacity style={styles.btnOption}>
            <Text>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnOption, styles.btnOptionSelected]}>
            <Text style={{color: 'white'}}>Populares</Text>
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
          </View>
          <Image
            source={require('@/assets/images/gato_oculos.png')}
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
        </View>
      </View>

    </ScrollView>
  );
}

const searchArts = (quantidade = 5) => {
  // Simulando a chamada à API
  return Array(quantidade).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Art ${index + 1}`,
    image: '@/assets/images/gato_com_oculos_perfil.avif',
    saled: index % 2 === 0,
    value: index * 10 + 100, // Valor de compra do artigo, simulado
  }));
}

const convertListToView = () => {
  const arts = searchArts();
  return arts.map((art) => (
    <ArtView key={art.id} title={art.title} image={art.image} saled={art.saled} valueArt={art.value} />
  ));
}

interface ComponentsProps {
  title?: string;
  image?: string;
  saled?: boolean;
  valueArt?: number;
}

const ArtView: React.FC<ComponentsProps> = ({ title = 'Sem titulo', image, saled, valueArt }) => {
  return (
    <View
      style={saled ? styles.containerArtV : styles.containerArt}
    >
      <Image
        source={require('@/assets/images/gato_oculos.png')}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
      />

      <Text style={{ color: "#00f" }}>MELHOR PRECO</Text>
      <Text style={styles.textArt}>{title}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnSale}>
          <Text style={{ color: "#fff" }}>Comprar</Text>
        </TouchableOpacity>
        <Text style={styles.textArt}>{saled ? "esta vendido" : `R$ ${valueArt}`}</Text>
      </View>
    </View>
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
  },
  containerArtV: {
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#bbb',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  containerArt: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  textArt: {
    fontSize: 15,
    color: '#000',
  }
});
