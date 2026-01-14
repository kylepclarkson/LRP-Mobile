import { BadgeScanner } from "@/components/businesses/shared/BadgeScanner"
import { parseBadgePayload } from "@/lib/badges/customerBadge"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"

export default function ScanCustomerForStampRecord() {
  const params = useLocalSearchParams<{
    stampDefinitionId: string
    amount: string
    currency: string
    notes?: string
  }>()

  const [error, setError] = useState<string | null>(null)

  const handleScanned = async (rawValue: string) => {
    const payload = parseBadgePayload(rawValue)

    if (!payload) {
      setError("This QR code is not a valid Aandeg customer badge.")
      throw new Error("Invalid badge")
    }

    router.replace({
      pathname: "/(business-user)/business-dashboard",
      params: {
        ...params,
        userId: payload.userId,
      },
    })
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-20 p-6">
        <Text className="text-white text-2xl font-bold">
          Scan Customer Badge
        </Text>
        <Text className="text-white/80 mt-1">
          Hold the customer’s badge inside the frame to continue.
        </Text>

        {/* Cancel button */}
        <Pressable
          onPress={() => router.back()}
          className="mt-4 self-start bg-white/20 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-medium">Cancel</Text>
        </Pressable>
      </View>

      {/* Scanner */}
      <BadgeScanner onScanned={handleScanned} />

      {/* Error message (optional) */}
      {error && (
        <View className="absolute bottom-10 left-0 right-0 items-center z-20">
          <Text className="text-red-400 font-semibold text-base">
            {error}
          </Text>
        </View>
      )}
    </View>
  )
}
