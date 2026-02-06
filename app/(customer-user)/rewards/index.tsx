import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText, PressableListItem } from "@/design-system";
import { OfferReward } from "@/lib/api/rewards/rewards.types";
import { useRewardsContext } from "@/lib/context/rewards";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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

function RewardsListHeader() {
  return (
    <View className="ml-2 py-4">
      <HeaderText level={2} className="mb-1">Available rewards</HeaderText>
    </View>
  )
}

function OfferRewardsListItem({ offerReward }: { offerReward: OfferReward }) {
  return (
    <View className="flex-row justify-start items-center">
      <View className="flex bg-gray-300 rounded-xl h-12 w-12 justify-center items-center">
        <FontAwesome6 name="gift" size={24} />
      </View>
      <View className="flex ml-2">
        <HeaderText level={3}>{offerReward.offerDefinition.title}</HeaderText>
        <HeaderText level={6}>{offerReward.offerDefinition.business.name}</HeaderText>
        <StatusPill offerReward={offerReward} />
      </View>
    </View>
  )
}


export default function RewardsScreen() {

  const { offerRewards, loadingOfferRewards, refreshOfferRewards } = useRewardsContext();

  return (
    <View className="flex-1">
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
          <FlatList
            data={offerRewards}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={RewardsListHeader}
            refreshing={loadingOfferRewards}
            onRefresh={refreshOfferRewards}
            renderItem={({ item, index }) => (
              <PressableListItem
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/(customer-user)/rewards/[id]/offer-rewards-details",
                    params: { id: item.id }
                  })
                }
                showDivider={index < offerRewards.length - 1}
              >
                <OfferRewardsListItem offerReward={item} />
              </PressableListItem>
            )}
          />
        </View>
      )}
    </View>
  )
}