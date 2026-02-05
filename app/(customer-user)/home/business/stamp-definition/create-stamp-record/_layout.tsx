// profile/business/stamp-definition/create-stamp-record/_layout.tsx
import { Stack } from "expo-router";

export default function CreateStampRecordLayout() {
  return (
    <Stack>
      <Stack.Screen name="[stampProgramId]" options={{ headerShown: false }} />
    </Stack>
  );
}