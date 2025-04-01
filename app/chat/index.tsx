import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ChatHomeScreen() {
  const router = useRouter()

  return (
    <View>
      <Text style={style.link} onPress={() => router.navigate('/(tabs)')}>Ir pra home</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/chat')}>Conversar no chat</Text>
      <Text style={style.link} onPress={() => router.navigate('/chat/chatIa')}>Conversar com ia</Text>
      <TextInput placeholder="Ai calica" />
    </View>
  )
}

const style = StyleSheet.create({
  link: {
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  }
})