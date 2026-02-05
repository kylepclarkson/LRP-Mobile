import { StampProgress } from "@/components/businesses/stamps/StampProgress";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { StampCard, StampCardState } from "@/lib/api/stamps/stamps.types";
import { useStampsContext } from "@/lib/context/stamps";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

function StampListHeader() {
  return (
    <View className="ml-2 py-4">
      <Text className="text-2xl font-bold mb-1">Your Stamp Cards</Text>
    </View>
  )
}

/**
 * Displays the user's stamp cards. 
 * By default the stamp cards are filter to be those "in-progress".
 */
export default function RewardTrackerScreen() {

  const { stampCards, loadingStampCards, refreshStampCards } = useStampsContext();
  // TODO - implement filter for cards that are in progress
  const inProgressStampCards = stampCards.filter(card => card.state === StampCardState.IN_PROGRESS)

  useEffect(() => {
    refreshStampCards();
  }, []);

  const renderStampCardItem = ({ item }: { item: StampCard }) => (
    <Pressable
      className="mb-4 active:opacity-80"
      onPress={() => router.push({
        pathname: `/tracker/stamps/details/[stampCardId]`,
        params: {
          stampCardId: item.id
        }
      })}
    >
      <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <Text className="text-2xl font-bold">{item.stampProgram.business.name}</Text>
        <Text className="text-md font-light text-gray-900">
          {item.stampProgram?.title}
        </Text>
        <StampProgress card={item} />
      </View>
    </Pressable>

  );

  return (
    <View className="flex-1">
      {/* Loading state */}
      {loadingStampCards && (
        <View className="mt-10 items-center">
          <LoadingOverlay />
        </View>
      )}

      {/* Empty state */}
      {!loadingStampCards && stampCards.length === 0 && (
        <View className="mt-10 items-center">
          <Text className="text-lg text-gray-900">No stamp cards yet</Text>
        </View>
      )}

      {/* List */}
      {!loadingStampCards && stampCards.length > 0 && (
        <View className="flex-1 px-4 pt-6">
          <FlatList
            data={stampCards}
            keyExtractor={(item) => item.id}
            refreshing={loadingStampCards}
            ListHeaderComponent={StampListHeader}
            onRefresh={refreshStampCards}
            renderItem={renderStampCardItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      )}
    </View>

  );
}

