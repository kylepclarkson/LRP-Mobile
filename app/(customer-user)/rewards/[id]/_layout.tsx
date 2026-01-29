import { PageHeader } from "@/components/common/PageHeader"
import { Stack } from "expo-router"

export default function OfferIdLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="offer-rewards-details"
        options={{
          header: () => <PageHeader headerText={`Reward Details`} />
        }}
      />
    </Stack>
  )
}