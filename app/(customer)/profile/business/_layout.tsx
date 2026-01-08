import { Stack } from "expo-router";

export default function BusinessLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="stamp-definition/create-stamp-record" options={{ headerShown: false }} />
    </Stack>
  );
}