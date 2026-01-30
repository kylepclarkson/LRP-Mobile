import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { useAuthContext } from '@/lib/context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import React from 'react';

export default function AuthenticatedLayout() {

  const { isLoadingUser } = useAuthContext();

  if (isLoadingUser) {
    return <LoadingOverlay />
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="home"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Tracker",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="progress-star"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="star"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="menu"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}