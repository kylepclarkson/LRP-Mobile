import { PageHeader } from "@/components/common/PageHeader"
import { Stack } from "expo-router"

export default function StampProgramsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText={`Stamp Programs`} />
        }}
      />

      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  )
}