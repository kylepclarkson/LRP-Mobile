import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function RewardsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText="Your rewards" />
        }}
      />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}