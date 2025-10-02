import { AuthProvider, useAuthSession } from "@/lib/context/auth";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

function InitialLayout() {

  const { user } = useAuthSession();

  return (
    <Stack>
      <Stack.Protected guard={user === undefined}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="register" options={{ headerShown: false }} /> */}
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
