import { HeaderText } from "@/design-system";
import { OfferTypeText } from "@/lib/api/business-resource/business-resource.types";
import { useRewardsContext } from "@/lib/context/rewards";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function OfferRewardDetailPage() {
  const { id } = useLocalSearchParams();
  const { offerRewards } = useRewardsContext();

  const reward = offerRewards.find((r) => r.id === id);

  if (!reward) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <HeaderText level={3}>Reward not found</HeaderText>
        <Text className="text-gray-500 mt-2">
          We couldn’t locate a reward with ID {id}.
        </Text>
      </View>
    );
  }

  const { offerDefinition, issuedAt, redeemedAt, expiresAt } = reward;
  const { title, description, business, offerType, rules } = offerDefinition;

  // Render offer-type-specific rule details
  const renderRules = () => {
    switch (offerType) {
      case "free_item":
        return (
          <Text className="text-gray-700 mt-1">
            Receive a free item after{" "}
            <Text className="font-semibold">{rules.requiredPurchase}</Text>{" "}
            purchases.
          </Text>
        );

      case "percent_discount":
        return (
          <Text className="text-gray-700 mt-1">
            Enjoy a{" "}
            <Text className="font-semibold">{rules.percent}%</Text> discount on
            eligible purchases.
          </Text>
        );

      case "amount_discount":
        return (
          <Text className="text-gray-700 mt-1">
            Save{" "}
            <Text className="font-semibold">
              ${rules.amount.toFixed(2)}
            </Text>{" "}
            on your next purchase.
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 p-6">
      {/* Title */}
      <HeaderText level={2}>{title}</HeaderText>
      <Text className="text-gray-500 mt-1">{OfferTypeText[offerType]}</Text>

      {/* Business */}
      <View className="mt-4">
        <HeaderText level={4}>Issued by</HeaderText>
        <Text className="text-gray-700 mt-1">{business.name}</Text>
      </View>

      {/* Description */}
      <View className="mt-6">
        <HeaderText level={4}>Description</HeaderText>
        <Text className="text-gray-700 mt-1 leading-relaxed">
          {description}
        </Text>
      </View>

      {/* Rules */}
      <View className="mt-6">
        <HeaderText level={4}>Reward details</HeaderText>
        {renderRules()}
      </View>

      {/* Dates */}
      <View className="mt-6">
        <HeaderText level={4}>Timeline</HeaderText>

        <Text className="text-gray-700 mt-1">
          Issued:{" "}
          <Text className="font-semibold">
            {issuedAt.toLocaleDateString()}
          </Text>
        </Text>

        {expiresAt && (
          <Text className="text-gray-700 mt-1">
            Expires:{" "}
            <Text className="font-semibold">
              {expiresAt.toLocaleDateString()}
            </Text>
          </Text>
        )}

        {redeemedAt && (
          <Text className="text-gray-700 mt-1">
            Redeemed:{" "}
            <Text className="font-semibold">
              {redeemedAt.toLocaleDateString()}
            </Text>
          </Text>
        )}
      </View>

      {/* Spacer */}
      <View className="h-12" />
    </ScrollView>
  );
}