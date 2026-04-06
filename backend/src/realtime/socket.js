import { EventEmitter } from "node:events";

class RealtimeHub extends EventEmitter {
  publish(channel, payload) {
    this.emit(channel, payload);
  }

  subscribe(channel, listener) {
    this.on(channel, listener);
    return () => this.off(channel, listener);
  }
}

export const realtimeHub = new RealtimeHub();
