import { AuthProvider, useAuthContext } from "@/lib/context/auth";
import { BusinessMembershipProvider, useBusinessMembershipContext } from "@/lib/context/business-membership";
import { RewardsProvider } from "@/lib/context/rewards";
import { Stack } from "expo-router";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BottomSheetProvider } from "@/lib/context/bottom-sheet";
import { BusinessResourceProvider } from "@/lib/context/business-resource";
import { NotificationProvider } from "@/lib/context/notifications";
import { StampsProvider } from "@/lib/context/stamps";
import { ThemeProvider } from "@/lib/context/ThemeProvider";
import { WebSocketProvider } from "@/lib/context/websocket";
import { View } from "react-native";
import "./global.css";

function InitialLayout() {

  const { user, isLoadingUser } = useAuthContext();
  const { businessMode } = useBusinessMembershipContext();

  if (isLoadingUser) {
    return <LoadingOverlay />
  }

  console.debug("Rendering InitialLayout. User is set?", !!user);
  return (
    <Stack>
      {/* Unauthenticated  */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Authenticated customer user */}
      <Stack.Protected guard={!!user && !businessMode}>
        <Stack.Screen name="(customer-user)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Authenticated employee user */}
      {/* TODO implement stack. */}
      <Stack.Protected guard={!!user && businessMode}>
        <Stack.Screen name="(business-user)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View className="flex-1">
            <ThemeProvider>
              <AuthProvider>
                <WebSocketProvider>
                  <BottomSheetProvider>
                    <BusinessMembershipProvider>
                      <BusinessResourceProvider>
                        <RewardsProvider>
                          <StampsProvider>
                            <NotificationProvider>
                              <InitialLayout />
                              <Toast />
                            </NotificationProvider>
                          </StampsProvider>
                        </RewardsProvider>
                      </BusinessResourceProvider>
                    </BusinessMembershipProvider>
                  </BottomSheetProvider>
                </WebSocketProvider>
              </AuthProvider>
            </ThemeProvider>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
