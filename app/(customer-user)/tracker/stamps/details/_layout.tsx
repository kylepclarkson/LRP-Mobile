import { Stack } from "expo-router";

export default function StampCardsDetailLayout() {
  return (
    <Stack>
      <Stack.Screen name="[stampCardId]" options={{ headerShown: false }} />
    </Stack>
  )
}