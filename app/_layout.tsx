import { AuthProvider, useAuthSession } from "@/lib/context/auth";
import { Stack } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

function InitialLayout() {

  const { user, isLoadingUser } = useAuthSession();

  console.debug("InitialLayout render - user:", user, "isLoadingUser:", isLoadingUser);

  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

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
    <AuthProvider>
      <PaperProvider>
        <InitialLayout />
      </PaperProvider>
    </AuthProvider>
  );
}
