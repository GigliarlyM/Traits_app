import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FlipInEasyX } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

export default function ChatHomeScreen() {
  const [name, setName] = useState<string>()
  const router = useRouter()

  return (
    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
      <Text style={style.link} onPress={() => router.navigate('/(tabs)')}>Ir pra home</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/chat')}>Conversar no chat</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/chatIa')}>Conversar com ia</Text>
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
    </View>
  )
}

const style = StyleSheet.create({
  containerSend: {
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 5,
    left: 5,
    right: 5
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