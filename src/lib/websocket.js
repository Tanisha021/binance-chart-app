import ReconnectingWebSocket from 'reconnecting-websocket';
import { WS_BASE_URL } from './constants';

class WebSocketService {
  constructor() {
    this.connections = new Map();
    this.subscribers = new Map();
  }

  subscribe(symbol, interval, callback) {
    const streamName = `${symbol.toLowerCase()}@kline_${interval}`;
    const connectionId = `${symbol}-${interval}`;

    if (!this.connections.has(connectionId)) {
      const ws = new ReconnectingWebSocket(`${WS_BASE_URL}/${streamName}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const subscribers = this.subscribers.get(connectionId) || new Set();
        subscribers.forEach(cb => cb(data));
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.connections.set(connectionId, ws);
      this.subscribers.set(connectionId, new Set([callback]));
    } else {
      const subscribers = this.subscribers.get(connectionId);
      subscribers.add(callback);
    }

    return () => {
      const subscribers = this.subscribers.get(connectionId);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          const ws = this.connections.get(connectionId);
          if (ws) {
            ws.close();
            this.connections.delete(connectionId);
            this.subscribers.delete(connectionId);
          }
        }
      }
    };
  }

  unsubscribeAll() {
    this.connections.forEach((ws) => {
      ws.close();
    });
    this.connections.clear();
    this.subscribers.clear();
  }
}

export const wsService = new WebSocketService();