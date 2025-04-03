// Notei que para testar no browser devemos usar o WebSocket nativo
import WebSocket from 'ws'

interface ChatMessage {
    type: 'message' | 'error' | 'join' | 'leave';
    user: string;
    message: string;
    to?: string;
    timestamp?: Date;
}

let newSocket: WebSocket | null = null

export const getConnection = () => {
    newSocket = new WebSocket('ws://localhost:8080')

    newSocket.onopen = () => {
        console.log("Conexao estabelecida!!")
    }

    newSocket.onerror = (error) => {
        console.log("Erro WebSocket ", error);
    }

    return newSocket
}

export const receiveMessage = () => {
    let data: ChatMessage | null = null
    if (newSocket) {
        newSocket.onmessage = (event: any) => {
            console.log('Messagem recebida: ', event.data)
            data = event.data
        }
    }
    
    return data
}

export const sendMessage = (message: ChatMessage) => {
    if (newSocket) {
        newSocket.send(
            JSON.stringify(message)
        )
    }
}

export const exitConnection = () => {
    if (newSocket) {
        newSocket.close = () => {
            console.log("Conexao WebSocket fechada!")
        }
    }
}