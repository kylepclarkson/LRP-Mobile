import { useBusinessContext } from "@/lib/context/business";
import { Stack } from "expo-router";

export default function ProfileLayout() {

  const { activeEmployeeGroup } = useBusinessContext();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="business"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}