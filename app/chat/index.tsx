import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ChatHomeScreen() {
  const [name, setName] = useState<string>()
  const router = useRouter()

  return (
    <ScrollView style={{ marginHorizontal: 10, marginTop: 5 }}>
      <Text style={style.link} onPress={() => router.navigate('/(tabs)')}>Ir pra home</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/normal')}>Conversar no chat</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/ia')}>Conversar com ia</Text>
      <View style={style.containerSend}>
        <TextInput
          style={style.input}
          placeholder="Nome de quem quer conversar"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TouchableOpacity style={{paddingHorizontal: 10}}>
          <Icon name="send" style={{marginVertical: "auto"}} size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  containerSend: {
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})