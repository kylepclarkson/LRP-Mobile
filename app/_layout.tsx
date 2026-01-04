import { AuthProvider, useAuthContext } from "@/lib/context/auth";
import { BusinessProvider } from "@/lib/context/business";
import { RewardsProvider } from "@/lib/context/rewards";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { StampsProvider } from "@/lib/context/stamps";
import "./global.css";

function InitialLayout() {

  const { user, isLoadingUser } = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <GestureHandlerRootView>
          <AuthProvider>
            <BusinessProvider>
              <RewardsProvider>
                <StampsProvider>
                  <InitialLayout />
                  <Toast />
                </StampsProvider>
              </RewardsProvider>
            </BusinessProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
