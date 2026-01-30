import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText="Home" />
        }}
      />
      <Stack.Screen name="business" options={{ headerShown: false }} />
    </Stack>
  );
}