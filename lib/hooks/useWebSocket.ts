import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  type?: string;
  [key: string]: any;
}

export function useWebSocket(url?: string, authToken?: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if(!url || !authToken) return;

    // Build full URL with token
    const wsUrl = `${url}/?token=${authToken}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected:", wsUrl);
      setConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed:", wsUrl);
      setConnected(false);
    };

    // Cleanup on unmount or url/token change
    return () => {
      socket.close();
    };
  }, [url, authToken]);

  const send = (message: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not open. Message not sent:", message);
    }
  };

  return { send, lastMessage, connected };
}