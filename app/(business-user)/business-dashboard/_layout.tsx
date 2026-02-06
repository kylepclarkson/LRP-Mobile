import { PageHeader } from "@/components/common/PageHeader";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { Stack } from "expo-router";


export default function BusinessLayout() {

  const { activeBusinessRole } = useBusinessMembershipContext();

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

      <Stack.Screen name="catalog" options={{ headerShown: false }} />
      <Stack.Screen name="offers" options={{ headerShown: false }} />
      <Stack.Screen name="stamp-programs" options={{ headerShown: false }} />
    </Stack>
  )
}