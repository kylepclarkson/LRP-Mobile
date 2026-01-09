import { PageHeader } from "@/components/common/PageHeader";
import { Stack } from "expo-router";

export default function BusinessUserProfileLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText={`Profile - Business View`} />
        }} />
    </Stack>
  );
}