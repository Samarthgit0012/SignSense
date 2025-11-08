import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = 'http://localhost:8080/ws';

export const createWebSocketClient = () => {
  const client = new Client({
    webSocketFactory: () => new SockJS(WS_URL),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (str) => {
      console.log('STOMP: ' + str);
    },
  });

  return client;
};

export interface MessagePayload {
  userId: number;
  data: string;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
}
