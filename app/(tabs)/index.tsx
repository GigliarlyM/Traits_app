import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ArtView, ComponetArtProp } from '@/components/ArtView';
import { useCart } from '@/components/CartContext';
import { Description } from '@/components/DescriptionComponent';
import React, { useEffect, useState } from 'react';

import httpService from '@/service/httpService';

export default function TabArtScreen() {
  const [modalVisivel, setModelVisivel] = useState(false)
  const [arteSelecionada, setArteSelecionada] = useState<ComponetArtProp | null>(null)
  const { addToCart } = useCart()
  const [arts, setArts] = useState<ComponetArtProp[] | null>(null);

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

  const searchArts = async (quantidade = 5) => {
    const arts = await httpService.get('/art')

    if (arts.artes) {
      setArts(arts.artes.map((art: any) => {
        return {
          id: art._id,
          title: art.titulo,
          image: art.imagem,
          valueArt: art.valor
        }
      }))
    }
  }

  useEffect(() => {
    searchArts()
  }, [])

  interface CategoriasProps {
    name: String;
    actived: boolean;
  }

  const [categorias, setCategorias] = useState<CategoriasProps[]>([
    { name: "Todas", actived: false },
    { name: "Populares", actived: true },
    { name: "Ofertas", actived: false },
    { name: "Especiais", actived: false }
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
        {arts &&
          <FlatList
            horizontal
            data={arts}
            renderItem={({ item }) => (
              <ArtView
                key={item.id}
                title={item.title}
                image={item.image}
                saled={item.saled}
                valueArt={item.valueArt}
                onPress={() => abrirModal(item)}
              />)
            }
          />
        }
      </View>

      <View>
        <Text style={styles.titleText}>Ofertas</Text>
        <TouchableOpacity style={styles.offerArt}>
          <View style={{ alignSelf: 'center' }}>
            <Text>Desconto da semana</Text>
            <Text style={styles.textOff}>15% OFF</Text>
          </View>
          <Image
            source={require('@/assets/images/gato_oculos.png')}
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
        </TouchableOpacity>
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
