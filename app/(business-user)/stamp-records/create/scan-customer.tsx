import { BadgeScanner } from "@/components/businesses/shared/BadgeScanner"
import { parseBadgePayload } from "@/lib/badges/customerBadge"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"



export default function ScanCustomerForStampRecord() {
  const params = useLocalSearchParams<{
    stampDefinitionId: string
    amount: string
    currency: string
    notes?: string
  }>()

  const [error, setError] = useState<string | null>(null)

  const handleScanned = (rawValue: string) => {
    console.debug("HandleScanned called", rawValue);
    const payload = parseBadgePayload(rawValue);
    if (!payload) {
      setError("This QR code is not a valid Aandeg customer badge.")
      return
    }
    console.debug("QR code userID=", payload.userId)
    // TODO make backend request route back 

    // Navigate to submit screen with full payload
    router.replace({
      pathname: "/(business-user)/business-dashboard",
      params: {
        ...params,
        customerId: payload.userId,
      },
    })
  }

  return (
    <View className="flex-1">
      <BadgeScanner onScanned={handleScanned} />
      {error && (
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <Text className="text-red-500 font-semibold text-base">
            {error}
          </Text>
        </View>
      )}
    </View>
  )
}


