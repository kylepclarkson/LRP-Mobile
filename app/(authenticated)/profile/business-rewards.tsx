import ElevatedCard from "@/components/common/ElevatedCard";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { useBusinessContext } from "@/lib/context/business";
import { getStampDefinitions } from "@/lib/services/api/businesses.service";
import { StampDefinition } from "@/types/types";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import React, { JSX, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";


export default function BusinessRewardsScreen() {

  const { activeEmployeeGroup } = useBusinessContext();

  // const bottomSheetRef = React.useRef<BottomSheetMethods>(null);
  const bottomSheetRef = useRef<TrueSheet>(null);


  const [sheetContent, setSheetContent] = React.useState<JSX.Element | null>(null);
  const [stampDefinitions, setStampDefinitions] = React.useState<StampDefinition[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!activeEmployeeGroup) {
    return null;
  }

  // Fetch stamp definitions
  React.useEffect(() => {
    const fetchStampDefinitions = async () => {
      console.debug(`Fetching stamp definitions for business rewards screen. business_id=${activeEmployeeGroup.business.id}`);
      setLoading(true);
      let response: StampDefinition[] = [];
      try {
        response = await getStampDefinitions(activeEmployeeGroup.business.id);
      } catch (error) {
        console.error("Error fetching stamp definitions for business rewards screen", error);
      } finally {
        setLoading(false);
      }
      console.debug("Response", response)
      setStampDefinitions(response);
    };

    fetchStampDefinitions();
  }, [activeEmployeeGroup]);

  React.useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);

  const renderItem = ({ item }: { item: StampDefinition }) => (
    <Pressable
      onPress={() => {
        setSheetContent(
          <View className="p-6">
            <Text className="text-xl font-bold mb-4">{item.title}</Text>
            <Text className="text-base mb-2">Redeem for: {item.redemptionText}</Text>
            <Text className="text-base mb-2">Stamps required: {item.stampsRequired}</Text>
            <Text className="text-base mb-2">Created at: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text className="text-base mb-2">State: {item.state}</Text>
          </View>
        );
      }}
    >
      <View className="flex-1 mb-2">
        <View className="py-6 px-3 border rounded border-gray-200 bg-gray-50">
          <Text className="text-lg text-gray-900">{item.title}</Text>
        </View>
      </View>
    </Pressable>
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
          <Text className="text-3xl font-bold mb-2">{activeEmployeeGroup.business.name} Rewards</Text>
          <Text className="text-md italic text-gray-500">Role: {activeEmployeeGroup.name}</Text>
        </ElevatedCard>

        <ElevatedCard className="mt-4">
          <Text className="text-xl font-bold mb-2">Available Rewards</Text>
          <FlatList
            data={stampDefinitions}
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