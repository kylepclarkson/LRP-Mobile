import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { PageHeader } from "@/components/common/PageHeader";
import { StampProgress } from "@/components/stamps/StampProgress";
import { useStampsContext } from "@/lib/context/stamps";
import { StampCard, StampCardState } from "@/types/stamps";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function RewardTrackerScreen() {

  const { stampCards, fetchStampCards, loadingStampCards } = useStampsContext();
  // filter for cards that are in progress
  const inProgressStampCards = stampCards.filter(card => card.state === StampCardState.IN_PROGRESS)

  useEffect(() => {
    fetchStampCards();
  }, [])

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
        <Text className="text-2xl font-bold">{item.stampDefinition.business.name}</Text>
        <Text className="text-md font-light text-gray-900">
          {item.stampDefinition?.title}
        </Text>
        <StampProgress card={item} />
      </View>
    </Pressable>

  );

  return (
    <View className="pt-6 flex-1 bg-white">
      <FlatList
        data={inProgressStampCards}
        keyExtractor={(item) => item.id}
        renderItem={renderStampCardItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={<PageHeader headerText="Your Stamp Cards" />}
        stickyHeaderIndices={[0]}

        ListEmptyComponent={loadingStampCards ? <LoadingOverlay /> : null}
      />
    </View>

  );
}

