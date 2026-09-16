import { useState, useEffect } from "react";
import { connectSocket, disconnectSocket } from "../sockets/socketClient.js";

// Subscribes to real-time events. `onEvent` should be stable (useCallback).
export function useSocket({ onEvent } = {}) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = connectSocket();
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    const onMember = (payload) => onEvent?.("member:added", payload);
    const onMemberRemoved = (payload) => onEvent?.("member:removed", payload);
    const onLocation = (payload) => onEvent?.("location:updated", payload);
    const onFamilyDeleted = (payload) => onEvent?.("family:deleted", payload);
    socket.on("member:added", onMember);
    socket.on("member:removed", onMemberRemoved);
    socket.on("location:updated", onLocation);
    socket.on("family:deleted", onFamilyDeleted);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("member:added", onMember);
      socket.off("member:removed", onMemberRemoved);
      socket.off("location:updated", onLocation);
      socket.off("family:deleted", onFamilyDeleted);
      disconnectSocket();
    };
  }, [onEvent]);

  return connected;
}