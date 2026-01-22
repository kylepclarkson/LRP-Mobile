import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText } from "@/design-system";
import { PrimaryButton } from "@/design-system/components/buttons/PrimaryButton";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

export default function CreateOfferRewardScreen() {
  const { id } = useLocalSearchParams();
  const { offerDefinitions, loadingOfferDefinitions } = useBusinessResourceContext();

  const stampDefinition = useMemo(() => {
    if (!offerDefinitions) return null
    return offerDefinitions.find(def => def.id === id) ?? null
  }, [offerDefinitions, id]);

  if (loadingOfferDefinitions) {
    return <LoadingOverlay />
  }

  if (!stampDefinition) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-gray-800">
          Offer definition not found
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          The offer definition you’re trying to use doesn’t exist or was removed.
        </Text>
      </View>
    )
  }
  return (
    <View className="flex-1 px-4 py-6">
      <HeaderText level={1} className="mb-1">Create reward</HeaderText>

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