import manifest from './manifest.json';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socket = {
  stompClient: null,
  connectToWebSocket: (user, onMessageReceived, setMessages) => {
    const socketUrl = manifest['base_url'] + manifest['socket_endpoint'];

    const stompClient = new Client();
    const stompSocket = new SockJS(socketUrl);

    stompClient.configure({
      webSocketFactory: () => stompSocket,
      onConnect: () => onConnect(user, onMessageReceived, stompClient, setMessages),
      onError: onError
    });
    
    stompClient.activate();
    socket.stompClient = stompClient;
    return stompClient;
  } ,
  sendMessageChat: (payload) => sendMessageChat(socket.stompClient, payload),
  unsubscribeToTopic: () => {
    let stompClient = socket.stompClient;
    if(stompClient === null) {
      stompClient = new Client();
    }
   
  }
};

function onConnect(user, onMessageReceived, stompClient, setMessages) {
  console.log(`Conectado ao servidor STOMP como: ${user.username}`);
  const topic = "/topic/global";
  const subscription = stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, data]);
  });
  if(subscription) {
    console.log("inscrito no topico: " + topic);
    joinInRoom(stompClient, user);

    let topicPing = `/queue/${user.id}`
    const pingSub = stompClient.subscribe(topicPing, (message) => {
      console.log(message.body);
    })

    if(pingSub) {
      getPing(stompClient, user);
    }
    return 
  } else {
    console.log("Erro ao se inscrever no topico: " + topic)
  }
}

function joinInRoom(stompClient, user) {
  const destination = "/app/global.join";
  const body = user.id;
  try {
    stompClient.publish({destination, body});
    console.log("conectado a sala!")
  } catch (error) {
    console.log("erro ao se conectar a sala!")
    console.error(error)
  }
}

function getPing(stompClient, user) {
  const destination = "/app/queue.latency";
  const body = user.id;
  try {
    stompClient.publish({destination, body});
  } catch (error) {
    console.log("erro ao pegar o ping")
    console.error(error)
  }
}

function sendMessageChat(stompClient, payload) {
  if(stompClient === null) {
    stompClient = new Client();
  }
  const destination = "/app/global.send";
  const body = JSON.stringify({
    content: payload.content,
    userId: payload.userId
  });

  try {
    stompClient.publish({destination, body});
    console.log("mensagem enviada: " + payload.content)
  } catch (error) {
    console.log("erro ao enviar a mensagem!")
    console.error(error)
  }
}
 
function onError(err) {
  console.log('erro de conexão: ' + err)
}

export default socket;
