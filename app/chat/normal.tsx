import { useAuth } from "@/components/UserContext";
import { ChatMessage } from "@/service/socket";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function TabChatNormalScreen() {
  let { name } = useAuth()
  if (!name) {
    name = "Sem nome"
  }
  const [messages, setMessages] = useState<ChatMessage[]>([
    { message: "hello, World!", type: "join", user: name },
    { message: "hello", type: "message", user: "System" },
  ]);
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    const msg: ChatMessage = {
      message,
      type: "message",
      user: name,
    }
    setMessages([...messages, msg])
    setMessage("")
  }

  return (
    <>
      <FlatList
        style={style.containerMessages}
        data={messages}
        renderItem={({ item }) =>
          <MessageView item={item} name={name} />
        }
      />
      <View style={style.containerSend}>
        <TextInput
          style={style.input}
          placeholder="Nome de quem quer conversar"
          value={message}
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity style={style.btnSend}>
          <Icon
            onPress={onSendMessage}
            name="send"
            style={{ marginVertical: "auto" }}
            size={30}
            color={'white'} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const MessageView: React.FC<{ item: ChatMessage, name: string }> = ({ item, name }) => (
  <View style={[{paddingVertical: 5}, name == item.user ? { flexDirection: "row-reverse" } : { flexDirection: 'row' }]}>
    <View style={[style.msg, (name == item.user) ? style.msgMy : style.msgOuther]}>
      {(name == item.user) ?
        <><Text>{item.user}: </Text>
          <Text>{item.message}</Text></>
        :
        <><Text style={{ color: 'white' }}>{item.user}: </Text>
          <Text style={{ color: 'white' }}>{item.message}</Text></>
      }
    </View>
  </View>
)

const style = StyleSheet.create({
  msg: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    maxWidth: '70%'
  },
  msgMy: {
    backgroundColor: 'white',
  },
  msgOuther: {
    backgroundColor: 'green',
  },
  containerMessages: {
    flex: 1,
    marginBottom: 100,
    padding: 10,
    backgroundColor: '#eee',
  },
  btnSend: {
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  containerSend: {
    display: "flex",
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 4,
  },
  input: {
    backgroundColor: 'white',
    width: "90%",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})