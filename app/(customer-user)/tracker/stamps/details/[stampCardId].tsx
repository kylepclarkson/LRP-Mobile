import { StampProgress } from '@/components/businesses/stamps/StampProgress';
import { useStampsContext } from '@/lib/context/stamps';
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function StampCardDetailPage() {

  const {
    stampCardId
  } = useLocalSearchParams<{ stampCardId: string }>();

  const { stampCards } = useStampsContext();

  const stampCard = stampCards.find(item => item.id === stampCardId)!;

  return (

    <ScrollView className="flex-1 bg-white px-5 py-6">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">
          {stampCard?.stampProgram.title}
        </Text>
        <Text className="text-gray-500 mt-1">
          {stampCard?.stampProgram.business?.name}
        </Text>
      </View>

      {/* Progress Section */}
      <View className="bg-gray-100 rounded-xl p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Progress
        </Text>

        <View className="flex-row items-center justify-between mb-2">
          <StampProgress card={stampCard} animate={true} />
        </View>

        {/* Progress Bar */}
        {/* <View className="h-3 bg-gray-300 rounded-full overflow-hidden">
          <View
            className="h-full bg-blue-500"
            style={{ width: `${(stampsEarned / stampsRequired) * 100}%` }}
          />
        </View> */}
      </View>

      {/* Description */}
      {stampCard?.stampProgram.description && (
        <Section title="About this reward">
          <Text className="text-gray-700">{stampCard?.stampProgram.description}</Text>
        </Section>
      )}

      {/* How to Earn */}
      {stampCard?.stampProgram.progressionText && (
        <Section title="How to earn stamps">
          <Text className="text-gray-700">{stampCard?.stampProgram.progressionText}</Text>
        </Section>
      )}

      {/* How to Redeem */}
      {stampCard?.stampProgram.redemptionText && (
        <Section title="How to redeem">
          <Text className="text-gray-700">{stampCard?.stampProgram.redemptionText}</Text>
        </Section>
      )}

      {/* Business Info */}
      {/* {stampCard?.stampProgram.business && (
        <Section title="Offered by">
          <Text className="text-gray-900 font-semibold">
            {stampCard?.stampProgram.business.name}
          </Text>
          {stampCard?.stampProgram.business.address && (
            <Text className="text-gray-600 mt-1">
              {stampCard?.stampProgram.business.address}
            </Text>
          )}
        </Section>
      )} */}
    </ScrollView>
  )
}


function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </Text>
      <View className="bg-gray-50 rounded-xl p-4">
        {children}
      </View>
    </View>
  )
}