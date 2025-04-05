import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ChatHomeScreen() {
  const [name, setName] = useState<string>()
  const router = useRouter()

  const sendSingleChat = () => {
    if (name) {
      router.push({ pathname: '/chat/normal', params: { nameTo: name } })
    }
  }

  return (
    <ScrollView style={{ marginHorizontal: 10, marginTop: 5 }}>
      <Text style={style.link} onPress={() => router.navigate('/(tabs)')}>Ir pra home</Text>
      <Text style={style.link} onPress={() => router.push('/chat/normal')}>Conversar no chat</Text>
      <Text style={style.link} onPress={() => router.push('/chat/chatIa')}>Conversar com ia</Text>
      <View style={style.containerSend}>
        <TextInput
          style={style.input}
          placeholder="Nome de quem quer conversar"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TouchableOpacity onPress={sendSingleChat} style={{ paddingHorizontal: 10 }}>
          <Icon name="send" style={{ marginVertical: "auto" }} size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  containerSend: {
    flexDirection: 'row',
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
    width: '90%',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})