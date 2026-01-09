import { PageHeader } from "@/components/common/PageHeader";
import { useBusinessContext } from "@/lib/context/business";
import { Stack } from "expo-router";


export default function BusinessLayout() {

  const { activeBusinessRole } = useBusinessContext();

  if (!activeBusinessRole) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PageHeader headerText={`${activeBusinessRole.business.name} - Dashboard`} />
        }} />
    </Stack>
  )
}