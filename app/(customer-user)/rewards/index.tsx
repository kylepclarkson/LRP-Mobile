import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow } from "@/design-system";
import { OfferReward } from "@/lib/api/rewards/rewards.types";
import { useRewardsContext } from "@/lib/context/rewards";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface StatusPillProps {
  offerReward: OfferReward
}

const statusColors = {
  earned: "bg-blue-300",
  redeemed: "bg-orange-300",
  expired: "bg-red-300",
} as const

const statusText = {
  earned: "Earned",
  redeemed: "Redeemed",
  expired: "Expired"
}

function StatusPill({ offerReward }: StatusPillProps) {

  return (
    <View className={`px-2 py-1 rounded-full self-start ${statusColors[offerReward.status]}`}>
      <Text className="text-xs font-medium text-gray-700">
        {statusText[offerReward.status]}
      </Text>
    </View>
  )
}

export default function RewardsScreen() {

  const { offerRewards, loadingOfferRewards, refreshOfferRewards } = useRewardsContext();

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
        <View className="flex-1">
          <ListCard>
            <FlatList
              data={offerRewards}
              keyExtractor={(item) => item.id}
              refreshing={loadingOfferRewards}
              onRefresh={refreshOfferRewards}
              renderItem={({ item, index }) => (
                <ListRow
                  key={item.id}
                  title={item.offerDefinition.title}
                  subtitle={item.offerDefinition.description}
                  bottom={<StatusPill offerReward={item} />}
                  onPress={() =>
                    router.push({
                      pathname: "/(customer-user)/rewards/[id]/offer-rewards-details",
                      params: { id: item.id }
                    })
                  }
                  showDivider={index < offerRewards.length - 1}
                />
              )}
            />
          </ListCard>
        </View>
      )}
    </View>
  )
}