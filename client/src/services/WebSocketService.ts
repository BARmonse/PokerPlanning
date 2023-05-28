import { WEB_SOCKET_URL } from '../constants/constants';

class WebSocketService {
  webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket(WEB_SOCKET_URL);
  }
}

export default new WebSocketService();
