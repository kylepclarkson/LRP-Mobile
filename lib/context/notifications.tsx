import { useWebSocket } from "@/lib/context/websocket";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useRewardsContext } from "./rewards";


type NotificationContextType = {
  onOfferRewardCreated?: (handler: (payload: any) => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider(
  { children }: { children: React.ReactNode }
) {
  const { events } = useWebSocket();
  const { refreshOfferRewards } = useRewardsContext();
  
  /**
   * Store listeners in a ref, not state, as state arrays do not retrigger re-renders. 
   */
  const listenersRef = useRef<((payload: any) => void)[]>([]);

  /**
   * Handle WebSocket events from the server. 
   */
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
      listenersRef.current.forEach((fn) => fn(payload));
    }

    events.on("offer_reward_created", handleOfferRewardCreated);
    events.on("offer_reward_created", refreshOfferRewards);

    return () => {
      events.off("offer_reward_created", handleOfferRewardCreated);
      events.off("offer_reward_created", refreshOfferRewards);
    };
  }, [events]);

  /**
   * Register a listener. 
   * Returns an unsubscribe function so components may unsubscribe on clean up. 
   */
  const registerListener = (handler: (payload: any) => void) => {
    listenersRef.current = listenersRef.current.filter(fn => fn !== handler);
    return () => {
      listenersRef.current = listenersRef.current.filter(fn => fn !== handler);
    }
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