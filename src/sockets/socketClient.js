import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

let socket = null;

// Singleton; connect() after login so the JWT cookie is sent at handshake.
export function connectSocket() {
  if (socket) return socket;
  socket = io(SOCKET_URL, { withCredentials: true });
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}