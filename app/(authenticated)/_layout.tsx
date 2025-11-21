import { useAuthContext } from '@/lib/context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import React from 'react';
import { Text } from "react-native";

export default function AuthenticatedLayout() {

  const { user, isLoadingUser } = useAuthContext();

  if (isLoadingUser) {
    return <Text>Loading...</Text>
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="user"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>
      <Tabs.Screen
        name="reward-tracker"
        options={{
          title: "Tracker",
          headerShown: false,
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
        name="add-reward"
        options={{
          title: "Add reward",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add"
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