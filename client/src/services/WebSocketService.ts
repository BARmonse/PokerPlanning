import { WEB_SOCKET_URL } from '../constants/constants';
import { EventType } from '../enums/EventType';
import { Event } from '../interfaces/Event';

class WebSocketService {
  webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket(WEB_SOCKET_URL);
  }

  async sendEvent(type: EventType, payload: any) {
    const message: Event = {
      type: type,
      payload: payload,
    };

    this.webSocket.send(JSON.stringify(message));
  }
}

export default new WebSocketService();
