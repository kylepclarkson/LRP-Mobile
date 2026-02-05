import ElevatedCard from "@/components/common/ElevatedCard";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { StampProgram } from "@/lib/api/stamps/stamps.types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { router } from "expo-router";
import React, { JSX, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";


export default function BusinessRewardsScreen() {

  const bottomSheetRef = useRef<TrueSheet>(null);

  const [sheetContent, setSheetContent] = React.useState<JSX.Element | null>(null);
  const [stampPrograms, setstampPrograms] = React.useState<StampProgram[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);


  React.useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);

  const renderItem = ({ item }: { item: StampProgram }) => (
    <Pressable
      onPress={() => {
        setSheetContent(
          <View className="p-6">
            <Text className="text-xl font-bold mb-4">{item.title}</Text>
            <Text className="text-base mb-2">Redeem for: {item.redemptionText}</Text>
            <Text className="text-base mb-2">Stamps required: {item.stampsRequired}</Text>
            <Text className="text-base mb-2">Created at: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text className="text-base mb-2">State: {item.state}</Text>
            <Pressable
              onPress={async () => {
                console.debug("Navigating to create stamp record screen for stamp definition", item.id);
                router.push({
                  pathname: `/home/business/stamp-definition/create-stamp-record/[stampProgramId]`,
                  params: {
                    stampProgramId: item.id,
                    title: item.title
                  }
                })
                await bottomSheetRef.current?.dismiss();
              }}
              className={`bg-blue-500 py-2 px-4 rounded shadow-md p-3 border-2`}
            >
              <Text className={`text-white font-semibold text-center`}>
                Create Reward
              </Text>
            </Pressable>
          </View >
        );
      }}
    >
      <View className="flex-1 mb-2">
        <View className="py-6 px-3 border rounded border-gray-200 bg-gray-50">
          <Text className="text-lg text-gray-900">{item.title}</Text>
        </View>
      </View>
    </Pressable >
  );

  const EmptyList = () => (
    <View>
      <Text>No rewards available</Text>
    </View>
  );

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <SharedPageWrapper>
        <ElevatedCard>
          <></>
        </ElevatedCard>

        <ElevatedCard className="mt-4">
          <Text className="text-xl font-bold mb-2">Available Rewards</Text>
          <FlatList
            data={stampPrograms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItem({ item })}
            ListEmptyComponent={EmptyList}
          />
        </ElevatedCard>
      </SharedPageWrapper>
      <TrueSheet
        ref={bottomSheetRef}
        detents={['auto']}
      >
        {sheetContent}
      </TrueSheet>
    </>
  );
}