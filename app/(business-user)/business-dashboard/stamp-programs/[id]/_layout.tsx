import { PageHeader } from "@/components/common/PageHeader"
import { Stack } from "expo-router"

export default function StampProgramIdLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create-stamp-record"
        options={{
          header: () => <PageHeader headerText={`Create stamp record`} />
        }}
      />
    </Stack>
  )
}