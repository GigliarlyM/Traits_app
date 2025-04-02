import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

// Interface
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

export default function ChatIa() {
  // Onde armazena a mensagem
  const [messages, setMessages] = useState<IMessage[]>([])

  // Onde vai ser feito o armazenamento
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  // Callback quando estiver enviando a mensagem
  const onSend = useCallback((messages: IMessage[] | null) => {
    if (messages) {   
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}