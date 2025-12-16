

import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm";
import { CreateStampRecordFormData } from "@/components/forms/CreateStampRecordForm/types";
import { createStampRecord } from "@/lib/services/rewards.service";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {
  const {
    stampDefinitionId,
    title
  } = useLocalSearchParams<{ stampDefinitionId: string, title: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async ({
    currencyCode,
    currencyAmount,
    details
  }: CreateStampRecordFormData) => {

    const createStampRecordRequest = async () => {
      const res = await createStampRecord({
        stampDefinitionId,
        transaction: {
          amount: currencyAmount,
          currencyCode
        }
      });
      return res;
    }

    setIsSubmitting(true);
    try {
      const response = await createStampRecordRequest();
      console.debug("response:", response);
    } catch (error) {
      console.error("Error creating stamp record:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SharedPageWrapper>
      <View className="flex">
        <Text className="text-lg">{title}</Text>
        <CreateStampRecordForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </View>
    </SharedPageWrapper>
  );
}