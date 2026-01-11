import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";


export default function StampDefinitionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          header: () => <PageHeader headerText="Create Stamp Record" />
        }}
      />
    </Stack>
  )
}
