import { AuthProvider, useAuthContext } from "@/lib/context/auth";
import { BusinessProvider } from "@/lib/context/business";
import { RewardsProvider } from "@/lib/context/rewards";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

function InitialLayout() {

  const { user, isLoadingUser } = useAuthContext();

  console.debug("InitialLayout render - user:", user, "isLoadingUser:", isLoadingUser);

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack.Protected>
      {/* <Stack.Protected guard={__DEV__}>
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="storybook" />
      </Stack.Protected> */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <GestureHandlerRootView>
          <PaperProvider>
            <BusinessProvider>
              <AuthProvider>
                <RewardsProvider>
                  <InitialLayout />
                </RewardsProvider>
              </AuthProvider>
            </BusinessProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
