import { exitConnection, getConnection, receiveMessage, sendMessage } from "@/service/socket";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

interface IMessage {
  _id: number,
  text: string,
  createdAt: Date,
  user: {
    _id: number,
    name: string,
    avatar: string,
  }
}

export default function TabChatNormalScreen() {
  // Onde armazena a mensagem
  const [messages, setMessages] = useState<IMessage[]>([])

  // Onde vai ser feito o armazenamento
  useEffect(() => {
    getConnection()
    receiveMessage()
    exitConnection()
    
    setMessages([
      {
        _id: 1,
        text: 'Olá! Aqui você poderá conversar com a Ia gemini sobre qualquer dúvida que tem sobre o seu produto. Para finalizar a conversa, digite "fim".',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
    console.log(receiveMessage())
    //setMessages(previousMessages =>
    //  GiftedChat.append(previousMessages, messages),
    //)
  }, [])

  // Callback quando estiver enviando a mensagem
  const onSend = useCallback((messages: IMessage[] | null) => {
    if (messages) {
      sendMessage({
        user: "pattern",
        message: "Hello, world!",
        type: "message",
      })
      
    }
  }, [])

  return <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />
}