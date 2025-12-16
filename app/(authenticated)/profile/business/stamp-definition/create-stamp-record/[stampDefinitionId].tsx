

import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm";
import { CreateStampRecordFormData } from "@/components/forms/CreateStampRecordForm/types";
import { StampRecordDisplay } from "@/components/Stamps/StampRecordDisplay";
import { createStampRecord } from "@/lib/services/rewards.service";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams } from "expo-router";
import { JSX, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {
  const {
    stampDefinitionId,
    title
  } = useLocalSearchParams<{ stampDefinitionId: string, title: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sheetContent, setSheetContent] = useState<JSX.Element | null>(null);
  const bottomSheetRef = useRef<TrueSheet>(null);

  useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        console.debug("Opening bottom sheet")
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);

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
      console.debug("createdAt type", typeof response.createdAt);
      console.debug("claimBy type", typeof response.claimBy);
      setSheetContent(
        <StampRecordDisplay
          stampRecordId={response.stampRecordId}
          createdAt={response.createdAt}
          claimBy={response.claimBy}
        />
      );
      console.debug("response:", response);
    } catch (error) {
      console.error("Error creating stamp record:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SharedPageWrapper>
        <View className="flex">
          <Text className="text-lg">{title}</Text>
          <CreateStampRecordForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </View>
      </SharedPageWrapper>
      <TrueSheet ref={bottomSheetRef} detents={[0.8]}>
        {sheetContent}
      </TrueSheet>
    </>
  );
}