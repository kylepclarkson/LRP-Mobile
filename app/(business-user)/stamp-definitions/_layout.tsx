import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function stampProgramsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText="Stamp definitions" />
        }}
      />
    </Stack>
  )
}

