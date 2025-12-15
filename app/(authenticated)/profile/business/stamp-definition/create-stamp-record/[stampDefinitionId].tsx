

import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm";
import { StampDefinition } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {
  const {
    stampDefinitionId,
    title
  } = useLocalSearchParams<{ stampDefinitionId: string, title: string }>();

  const [stampDefinition, setStampDefinition] = useState<StampDefinition>();

  useEffect(() => {
    // Set
  }, [])

  return (
    <SharedPageWrapper>
      <View className="flex">
        <Text className="text-lg">{title}</Text>
        <CreateStampRecordForm />
      </View>
    </SharedPageWrapper>
  );
}