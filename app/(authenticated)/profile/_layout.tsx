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
        name="create-stamp-record"
        options={() => ({
          title: activeEmployeeGroup
            ? `${activeEmployeeGroup?.business.name} - Create Stamp Record`
            : "Create Stamp Record"
        })}
      />
    </Stack>
  );
}