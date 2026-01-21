import { PrimaryButton } from "@/design-system/components/buttons/PrimaryButton"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function CreateOfferRewardScreen() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">Create Reward</Text>
      <Text className="text-gray-600 mt-2">
        Creating reward for offer: {id}
      </Text>

      <PrimaryButton
        title="Confirm"
        className="mt-6"
        onPress={() => {
          // call your API to create OfferReward
        }}
      />
    </View>
  )
}