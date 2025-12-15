

import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {
  const { stampDefinitionId } = useLocalSearchParams<{ stampDefinitionId: string }>();

  return (
    <SharedPageWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Create Stamp Record Screen</Text>
        <Text className="mt-4">Stamp Definition ID: {stampDefinitionId}</Text>
      </View>
    </SharedPageWrapper>
  );
}