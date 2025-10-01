import { useAuthSession } from '@/lib/context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from "expo-router";
import React from 'react';
import { Text } from "react-native-paper";

export default function AuthenticatedLayout() {

  const { user, isLoadingUser } = useAuthSession();

  if (isLoadingUser) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    console.info("redirecting unauthed user to login")
    return <Redirect href={"/(auth)/login"} />
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