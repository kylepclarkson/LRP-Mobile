import { EventEmitter } from "events";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import { getAccessToken } from "../services/token.service";
import { useAuthContext } from "./auth";

type WebSocketContextType = {
  isConnected: boolean;
  sendMessage: (msg: object) => void;
  events: EventEmitter;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const wsRef = useRef<WebSocket | null>(null);
  const wsEvents = new EventEmitter();

  const [token, setToken] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const reconnectAttempts = useRef(0);
  const appIsActive = useRef(true);

  // Load access token
  useEffect(() => {
    async function loadToken() {
      getAccessToken().then(setToken)
    }
    loadToken();
  }, []);

  // Exponential backoff reconnection. 
  const scheduleReconnect = useCallback(() => {
    if (!user || !token) return;        // don't reconnect if logged out
    if (!appIsActive.current) return;   // don't reconnect in background
    if (wsRef.current) return;          // don't reconnect if already connected

    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 3000);
    console.debug(`WS: Reconnecting in ${delay}ms`);

    setTimeout(() => {
      reconnectAttempts.current += 1;
      connect();
    }, delay);
  }, [user, token]);


  const connect = useCallback(() => {
    if (!user || !token) {
      console.debug("WS: No user or token, skipping connection");
      return;
    }

    if (wsRef.current) {
      console.debug("WS: Already connected");
      return;
    }
    // TODO import from urls. 
    const wsUrl = `wss://antone-logomachic-marcia.ngrok-free.dev/ws/?token=${token}`;
    console.debug("WS: Connecting to", wsUrl);

    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.onopen = () => {
      console.debug("WS: Connected");
      reconnectAttempts.current = 0;
      setIsConnected(true);

      // Example: auto-subscribe to user channels
      socket.send(
        JSON.stringify({
          action: "subscribe",
          channels: [
            `user_${user.id}_rewards`,
            `user_${user.id}_redemptions`,
          ],
        })
      );
    };

    socket.onclose = () => {
      console.debug("WS: Disconnected");
      setIsConnected(false);
      wsRef.current = null;
      scheduleReconnect();
    };

    socket.onerror = (err) => {
      console.warn("WS: Error", err);
      // onclosed is invoked - attempt to reconnect
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.debug("WS: Message received", data);
        // Publish messages to events bus. Components can listen
        // for events that match data.type to consume the payload. 
        wsEvents.emit(data.type, data.payload);
      } catch (err) {
        console.error("WS: Failed to parse message", err);
      }
    };
  }, [user, token]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      console.debug("WS: Closing connection");
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  // App lifecycle: open on foreground, close on background
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        connect();
      } else {
        disconnect();
      }
    });

    // Connect immediately if app is already active
    if (AppState.currentState === "active") {
      connect();
    }

    return () => {
      sub.remove();
      disconnect();
    };
  }, [connect, disconnect]);

  // Reconnect when token/user changes
  useEffect(() => {
    disconnect();
    reconnectAttempts.current = 0;
    connect();
  }, [token, user, connect, disconnect]);

  const sendMessage = useCallback((msg: object) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WS: Tried to send message but socket not open");
      return;
    }
    wsRef.current.send(JSON.stringify(msg));
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        events: wsEvents
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return ctx;
}