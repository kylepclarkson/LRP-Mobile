import { AuthProvider, useAuthContext } from "@/lib/context/auth";
import { RewardsProvider } from "@/lib/context/rewards";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <RewardsProvider>
            <InitialLayout />
          </RewardsProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
