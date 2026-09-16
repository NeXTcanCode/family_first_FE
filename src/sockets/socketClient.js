import { io } from "socket.io-client";

// Same-origin in production (proxied to the backend via public/_redirects) so the
// socket handshake's auth cookie is first-party. Dev connects directly since
// Vite (5173) and the API (4000) are same-site localhost.
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : window.location.origin);

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