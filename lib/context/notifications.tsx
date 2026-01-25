import { useWebSocket } from "@/lib/context/websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";


type NotificationContextType = {
  onOfferRewardCreated?: (handler: (payload: any) => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider(
  { children }: { children: React.ReactNode }
) {
  const { events } = useWebSocket();
  // callback listeners
  const [listeners] = useState<((payload: any) => void)[]>([]);

  useEffect(() => {
    function handleOfferRewardCreated(payload) {
      console.debug("payload=", payload)
      Toast.show({
        type: "success",
        text1: "New reward received",
        text2: payload.title ?? "You’ve earned a new reward",
        position: "top",
        visibilityTime: 4000,
      });
      listeners.forEach((fn) => fn(payload));
    }

    events.on("offer_reward_created", handleOfferRewardCreated);

    return () => {
      events.off("offer_reward_created", handleOfferRewardCreated);
    };
  }, [events, listeners]);

  // Allows provider users to register for notification events. 
  const registerListener = (handler: (payload: any) => void) => {
    listeners.push(handler);
  }

  return (
    <NotificationContext.Provider value={{
      onOfferRewardCreated: registerListener
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationsContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be defined within NotificationsProvider");
  }
  return context;
}