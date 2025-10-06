import { AuthProvider, useAuthSession } from "@/lib/context/auth";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function InitialLayout() {

  const { user, isLoadingUser } = useAuthSession();

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
      {/* <ScrollView> */}
      <AuthProvider>
        <PaperProvider>
          <InitialLayout />
        </PaperProvider>
      </AuthProvider>
      {/* </ScrollView> */}
    // </SafeAreaProvider>
  );
}
