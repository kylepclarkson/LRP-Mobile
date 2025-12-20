import { Stack } from "expo-router";

export default function StampsLayout() {
  return (
    <Stack>
      <Stack.Screen name="details" options={{ headerShown: false }} />
    </Stack>
  )
}
