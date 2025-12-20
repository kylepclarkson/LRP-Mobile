import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { StampProgress } from "@/components/stamps/StampProgress";
import { useAuthContext } from "@/lib/context/auth";
import { useStampsContext } from "@/lib/context/stamps";
import { StampCard, StampCardState } from "@/types/stamps";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function RewardTrackerScreen() {

  const { user } = useAuthContext();
  const { stampCards, fetchStampCards, loadingStampCards } = useStampsContext();
  // filter for cards that are in progress
  const inProgressStampCards = stampCards.filter(card => card.state === StampCardState.IN_PROGRESS)

  useEffect(() => {
    fetchStampCards();
  }, [])

  const renderStampCardItem = ({ item }: { item: StampCard }) => (
    <Pressable className="mb-4 active:opacity-80">
      <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <Text className="text-2xl font-bold">{item.stampDefinition.business.name}</Text>
        <Text className="text-md font-light text-gray-900">
          {item.stampDefinition?.title}
        </Text>
        <StampProgress card={item} />
      </View>
    </Pressable>

  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4 text-gray-900">
        Rewards Tracker
      </Text>
      <View>
        {loadingStampCards ? (
          <LoadingOverlay />
        ) : (
          <FlatList
            data={inProgressStampCards}
            keyExtractor={(item) => item.id}
            renderItem={renderStampCardItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>

  )
}

