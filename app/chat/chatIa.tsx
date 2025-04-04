import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

export default async function ChatIa() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [chatAtivo, setChatAtivo] = useState(true)

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
  }, [])

  // Callback quando estiver enviando a mensagem
  const onSend = useCallback(async (messages: IMessage[] | null) => {
    if (!messages) return;
  
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    
    // Aqui é por conta que o usuário sempre vai começar sem digitar nada
    const userMessage = messages[0];
  
    // Validação se o usuário digitou fim ou não
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
  
    // O usuário não digitou fim
    try {
      const responseText = await startChat(userMessage.text);
      const botMessage: IMessage = {
        _id: Math.random(),
        text: responseText ?? "Não entendi sua pergunta.",
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
    } catch (error) {
      console.error("Erro ao obter resposta da IA:", error);
    }
  }, [chatAtivo]);

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