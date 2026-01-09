import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText="Settings" />
        }}
      />
      <Stack.Screen
        name="employee-settings"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}