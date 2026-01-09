import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function TrackerLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          header: () => <PageHeader headerText="Tracker" /> 
        }} 
      />
      <Stack.Screen name="stamps" options={{ headerShown: false }} />
    </Stack>
  )
}