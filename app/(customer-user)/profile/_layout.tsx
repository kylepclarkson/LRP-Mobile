import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          header: () => <PageHeader headerText="Profile" />
         }} 
      />
      <Stack.Screen name="business" options={{ headerShown: false }} />
    </Stack>
  );
}