import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

interface ChatMessage {
  type: 'message' | 'error' | 'join' | 'leave';
  user: string;
  message: string;
  to?: string;
  timestamp?: Date;
}

export default function ChatIa() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatAtivo, setChatAtivo] = useState(true)
  const socketRef = useRef<WebSocket | null>(null)
  const userId = useRef(Math.random().toString(36).substring(2, 9)).current

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá! Aqui você poderá conversar com a Ia gemini sobre qualquer dúvida que tem sobre o seu produto. Para finalizar a conversa, digite "fim".',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Gemini',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])


    // Fazer a conexão se pa
    const wsUrl = "ws://10.5.3.228:8080/chat"
    socketRef.current = new WebSocket(wsUrl)

    socketRef.current.onopen = () => {
      console.log("Conectado ao WebSocket")

      const joinMessage: ChatMessage = {
        type: 'join',
        user: userId,
        message: 'Entrou no chat com IA',
        to: 'chat-ia',
      }

      socketRef.current?.send(JSON.stringify(joinMessage))
    }

    socketRef.current.onmessage = (e) => {
      const received: ChatMessage = JSON.parse(e.data)

      const newMessage: IMessage = {
        _id: Math.random(),
        text: received.message,
        createdAt: received.timestamp ? new Date(received.timestamp) : new Date(),
        user: {
          _id: received.user === 'AI' || received.user === 'chat-ia' ? 2 : 1,
          name: received.user,
          avatar: received.user === 'AI' ? 'https://placeimg.com/140/140/any' : undefined,
        },
      }

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]))
    }

    socketRef.current.onerror = (e) => {
      console.error("Erro no WebSocket", e)
    }

    socketRef.current.onclose = () => {
      console.log("WebSocket desconectado")
    }

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close()
      }
    }
  }, [])


  // Callback quando estiver enviando a mensagem
  const onSend = useCallback(async (messages: IMessage[] | null) => {
    if (!messages) return;

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    // Aqui é por conta que o usuário sempre vai começar sem digitar nada
    const userMessage = messages[0];

    // Validação se o usuário digitou fim
    if (userMessage.text.toLowerCase() === "fim") {
      setChatAtivo(false);
      const botMessage: IMessage = {
        _id: Math.random(),
        text: "Chat encerrado. Obrigado pela conversa!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Gemini IA",
          avatar: "https://placeimg.com/140/140/any",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage])
      );
      return;
    }

    // Outra nova forma de método quando o usuário ainda não digitou "fim"
    const msgToSend: ChatMessage = {
      type: 'message',
      user: userId,
      message: userMessage.text,
      to: 'chat-ia',
    }

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msgToSend))
    } else {
      console.warn('WebSocket ainda está conectando...')
    }

  }, [chatAtivo, userId]);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      // Boolean se o chat está ativo ou não, com o usuário digitando
      isTyping={chatAtivo}
    />
  )
}