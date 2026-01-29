import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText } from "@/design-system";
import { RewardsService } from "@/lib/api/rewards/rewards.service";
import { OfferReward, OfferTypeText } from "@/lib/api/rewards/rewards.types";
import { useRewardsContext } from "@/lib/context/rewards";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function OfferRewardDetailPage() {
  const { id } = useLocalSearchParams<{
    id: string
  }>();
  const { offerRewards } = useRewardsContext();

  const reward = offerRewards.find((r) => r.id === id);
  const [offerReward, setOfferReward] = useState<OfferReward | null>(null);
  const [loadingOfferReward, setLoadingOfferReward] = useState<boolean>(false);

  const fetchOfferReward = useCallback(async () => {
    setLoadingOfferReward(true);
    try {
      const data = await RewardsService.getOfferReward(id);
      if (!data) {
        setOfferReward(null);
        return;
      }
      setOfferReward({
        ...data,
        issuedAt: new Date(data.issuedAt),
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        redeemedAt: data.redeemedAt ? new Date(data.redeemedAt) : undefined,
      })
    } catch (error) {
      console.warn(`Error fetching offer reward id=${id}`);
    } finally {
      setLoadingOfferReward(false);
    }
  }, []);

  useEffect(() => {
    fetchOfferReward();
  }, []);


  if (loadingOfferReward) {
    return <LoadingOverlay />
  } else if (!loadingOfferReward && offerReward) {
    return (
      <ScrollView className="flex-1 p-6">
        {/* Title */}
        <HeaderText level={2}>{offerReward?.offerDefinition.title}</HeaderText>
        <Text className="text-gray-500 mt-1">{OfferTypeText[offerReward.offerDefinition.offerType]}</Text>

        {/* Description */}
        <View className="mt-6">
          <HeaderText level={4}>Description</HeaderText>
          <Text className="text-gray-700 mt-1 leading-relaxed">
            {offerReward.offerDefinition.description}
          </Text>
        </View>

        {/* Dates */}
        <View className="mt-6">
          <HeaderText level={4}>Timeline</HeaderText>

          <Text className="text-gray-700 mt-1">
            Issued:{" "}
            <Text className="font-semibold">
              {offerReward.issuedAt.toLocaleDateString()}
            </Text>
          </Text>

          {offerReward.expiresAt && (
            <Text className="text-gray-700 mt-1">
              Expires:{" "}
              <Text className="font-semibold">
                {offerReward.expiresAt.toLocaleDateString()}
              </Text>
            </Text>
          )}

          {offerReward.redeemedAt && (
            <Text className="text-gray-700 mt-1">
              Redeemed:{" "}
              <Text className="font-semibold">
                {offerReward.redeemedAt.toLocaleDateString()}
              </Text>
            </Text>
          )}
        </View>

        {/* Spacer */}
        <View className="h-12" />
      </ScrollView>
    );
  }

  // Error scenario
  return (
    <View className="flex-1 items-center justify-center p-6">
      <HeaderText level={3}>Reward not found</HeaderText>
      <Text className="text-gray-500 mt-2">
        We couldn’t locate a reward with ID {id}.
      </Text>
    </View>
  );
}