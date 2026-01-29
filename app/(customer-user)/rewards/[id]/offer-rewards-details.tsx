import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, PrimaryButton } from "@/design-system";
import { RewardsService } from "@/lib/api/rewards/rewards.service";
import { OfferReward, OfferTypeText } from "@/lib/api/rewards/rewards.types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function OfferRewardDetailPage() {
  const { id } = useLocalSearchParams<{
    id: string
  }>();

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

  return (
    <>
      {/* Loading state */}
      {loadingOfferReward && (
        <LoadingOverlay />
      )}
      {/* OfferReward not found */}
      {!loadingOfferReward && !offerReward && (
        <View className="flex-1 items-center justify-center p-6">
          <HeaderText level={3}>Reward not found</HeaderText>
          <Text className="text-gray-500 mt-2">
            We couldn’t locate a reward with ID {id}.
          </Text>
        </View>
      )}
      {/* Render OfferReward */}
      {!loadingOfferReward && offerReward && (
        <ScrollView className="flex-1 p-2">
          <View className="flex">
            <View className="flex-row justify-start items-center my-2">
              <View className="flex bg-gray-300 rounded-xl h-20 w-20 justify-center items-center">
                <FontAwesome6 name="gift" size={40} />
              </View>
              <View className="flex ml-2">
                <HeaderText level={2}>{offerReward.offerDefinition.title}</HeaderText>
                <HeaderText level={3}>{offerReward.offerDefinition.business.name}</HeaderText>
                <HeaderText level={5}>{OfferTypeText[offerReward.offerDefinition.offerType]}</HeaderText>
              </View>
            </View>
            {/* */}
            {offerReward.status === 'earned' && (
              // TODO implement bottom sheet to render QR code. 
              <View className="mt-4">
                <PrimaryButton>
                  Show reward code
                </PrimaryButton>
              </View>
            )}
            {/* Description */}
            <View className="mt-4">
              <HeaderText level={4}>Description</HeaderText>
              <BodyText>
                {offerReward.offerDefinition.description}
              </BodyText>
            </View>
          </View>
          {/* Spacer */}
        </ScrollView>
      )}
    </>
  )
}