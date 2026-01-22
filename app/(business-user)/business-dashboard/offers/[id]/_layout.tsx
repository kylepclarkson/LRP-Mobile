import { PageHeader } from "@/components/common/PageHeader"
import { Stack } from "expo-router"

export default function OfferIdLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create-offer-reward"
        options={{
          header: () => <PageHeader headerText={`Create reward`} />
        }}
      />
    </Stack>
  )
}