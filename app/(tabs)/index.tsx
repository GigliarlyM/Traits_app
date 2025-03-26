import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';

import React, { act, useState } from 'react';
import { ArtView, ComponetArtProp } from '@/components/ArtView';
import { Description } from '@/components/description';
import { useCart } from '@/components/CartContext';


export default function TabArtScreen() {
  const [modalVisivel, setModelVisivel] = useState(false)
  const [arteSelecionada, setArteSelecionada] = useState<ComponetArtProp | null>(null)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (arteSelecionada) {
      addToCart(arteSelecionada)
      fecharModal()
    }
  }

  const abrirModal = (arteSelt: ComponetArtProp) => {
    setArteSelecionada(arteSelt)
    setModelVisivel(true)
  }

  const fecharModal = () => {
    setModelVisivel(false)
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

  interface CategoriasProps {
    name: String;
    actived: boolean;
  }

  const [categorias, setCategorias] = useState<CategoriasProps[]>([
    { name: "Todas", actived: false }, { name: "Populares", actived: true }, { name: "Ofertas", actived: false }, { name: "Especiais", actived: false }
  ])

  const alterCategoria = (item: CategoriasProps) => {
    // categorias[item].actived
    const list = categorias.map(categoriaSelected => {
      if (categoriaSelected == item) {
        let { name, actived } = categoriaSelected
        actived = !actived

        return { name, actived }
      } else {
        return categoriaSelected
      }
    })

    setCategorias(list)
  }

  return (
    <ScrollView style={{ paddingHorizontal: 18, backgroundColor: '#1a4a90' }}>

      <View>
        <Text style={styles.titleText}>Selecione a categoria</Text>

        <FlatList
          horizontal
          style={{ marginVertical: 20 }}
          data={categorias}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() => alterCategoria(item.item)}
              style={[styles.btnOption, item.item.actived && styles.btnOptionSelected]}
            >
              <Text style={item.item.actived && { color: "white" }}>{item.item.name}</Text>
            </TouchableOpacity>
          )}
        />
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

      <Modal visible={modalVisivel} animationType="slide">
        <Description art={arteSelecionada!} onExit={fecharModal} onAddToCart={handleAddToCart} />
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
