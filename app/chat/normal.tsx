import { useAuth } from "@/components/UserContext";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface ChatMessage {
  type: 'message' | 'error' | 'join' | 'leave';
  user?: string | null;
  message: string;
  to?: string;
  timestamp?: Date;
}

export default function TabChatNormalScreen() {
  let { name, addName } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const { nameTo } = useLocalSearchParams()

  useEffect(() => {
    const wsUrl = "ws://192.168.0.4:8080/chat";
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("Conexão estabelecida!!");
      if (name != null) {
        const joinMsg: ChatMessage = {
          message: "Entrou no chat",
          type: "join",
          user: name,
        };
        socketRef.current?.send(JSON.stringify(joinMsg));
      } else {
        const joinMsg: ChatMessage = {
          message: "Entrou no chat",
          type: "join",
        };
        socketRef.current?.send(JSON.stringify(joinMsg));
      }
    };

    socketRef.current.onmessage = (e) => {
      const newMessage = JSON.parse(e.data) as ChatMessage;
      if (name == null || name == undefined) {
        addName(newMessage.message.split(" ")[1])
      }
      setMessages(prev => [...prev, newMessage]);
    };

    socketRef.current.onerror = (e) => {
      console.error("Erro no WebSocket:", e);
    };

    socketRef.current.onclose = (e) => {
      console.log("Conexão fechada:", e.reason);
    };

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [name]);

  const onSendMessage = () => {
    if (!message.trim()) return;

    const msg: ChatMessage = {
      message,
      type: "message",
      user: name,
      to: nameTo ? (nameTo as string) : undefined
    };

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
      setMessage("");
    } else {
      console.error("WebSocket não está conectado");
    }
  };

  return (
    <>
      <Text style={{ color: `white`, fontSize: 20 }}>{nameTo ? nameTo : "Geral"}</Text>
      <FlatList
        style={style.containerMessages}
        data={messages}
        renderItem={({ item }) => {
          if (item.user != 'System'){
            return (<MessageView item={item} name={name} />)
          } else {
            return null
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={style.containerSend}>
        <TextInput
          style={style.input}
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={onSendMessage}
        />
        <TouchableOpacity style={style.btnSend} onPress={onSendMessage}>
          <Icon
            name="send"
            style={{ marginVertical: "auto" }}
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const MessageView: React.FC<{ item: ChatMessage, name: string | null }> = ({ item, name }) => (

  <View style={[{ paddingVertical: 5 }, name == item.user ? { flexDirection: "row-reverse" } : { flexDirection: 'row' }]}>
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
    marginBottom: 70,
    padding: 10,
    backgroundColor: '#eee',
  },
  btnSend: {
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  containerSend: {
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