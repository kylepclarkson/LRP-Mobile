import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow } from "@/design-system";
import { OfferReward } from "@/lib/api/rewards/rewards.types";
import { useRewardsContext } from "@/lib/context/rewards";
import { Text, View } from "react-native";

export default function RewardsScreen() {

  const { offerRewards, loadingOfferRewards } = useRewardsContext();

  return (
    <View className="flex-1 px-4 py-6">
      {/* Header */}
      <HeaderText level={1} className="mb-1">
        Offers
      </HeaderText>
      <BodyText className="mb-6">
        Available rewards
      </BodyText>

      {/* Loading state */}
      {loadingOfferRewards && (
        <View className="mt-10 items-center">
          <LoadingOverlay />
        </View>
      )}

      {/* Empty state */}
      {!loadingOfferRewards && offerRewards.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="text-gray-600">No items yet</Text>
        </View>
      )}

      {/* List */}
      {!loadingOfferRewards && offerRewards.length > 0 && (
        <ListCard>
          {offerRewards.map((item: OfferReward, index: number) => (
            <ListRow
              key={item.id}
              title={item.offerDefinition.title}
              subtitle={item.offerDefinition.description}
              bottom={
                <View className="px-2 py-1 bg-gray-200 rounded-full self-start">
                  <Text className="text-xs font-medium text-gray-700">
                    {item.status}
                  </Text>
                </View>

              }
              onPress={() =>
                console.debug(`item=${item.id}`)
                // router.push(
                //   // `/(business-user)/business-dashboard/catalog/${encodeURIComponent(item.name)}`
                // )
              }
              showDivider={index < offerRewards.length - 1}
            />
          ))}
        </ListCard>
      )}
    </View>
  )
}