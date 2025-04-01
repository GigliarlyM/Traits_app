import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ComponetArtProp {
  id?: string;
  title: string;
  image?: string;
  saled?: boolean;
  valueArt: number;
}

const ArtView: React.FC<ComponetArtProp & { onPress?: () => void }> = ({ title = 'Sem titulo', image, saled, valueArt, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.containerArt}>
      <Image
        source={require('@/assets/images/gato_oculos.png')}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
      />

      <Text style={{ color: "#00f" }}>MELHOR PRECO</Text>
      <Text style={styles.textArt}>{title}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.textArt}>{saled ? "esta vendido" : `R$ ${valueArt}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export { ArtView, ComponetArtProp };
