import { useAuthSession } from '@/lib/context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React from 'react';
import { Text } from "react-native-paper";

export default function AuthenticatedLayout() {

  const { user, isLoadingUser } = useAuthSession();

  if (isLoadingUser) {
    return <Text>Loading...</Text>
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
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