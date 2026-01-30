

import { StampRecordDisplay } from "@/components/businesses/stamps/StampRecordDisplay";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm";
import { CreateStampRecordFormData } from "@/components/forms/CreateStampRecordForm/types";
import { paths } from "@/lib/api/http/api";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { createStampRecord, StampRecordState, stampRecordUpdateState } from "@/lib/services/stamps.service";
import { getAccessToken } from "@/lib/services/token.service";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams } from "expo-router";
import { JSX, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";


export default function CreateStampRecordScreen() {
  const {
    stampDefinitionId,
    title
  } = useLocalSearchParams<{ stampDefinitionId: string, title: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stampRecordClaimed, setStampRecordClaimed] = useState(false);
  const [sheetContent, setSheetContent] = useState<JSX.Element | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [stampRecordId, setStampRecordId] = useState<string | null>(null);

  const bottomSheetRef = useRef<TrueSheet>(null);

  // fetch access token
  useEffect(() => {
    getAccessToken().then(setAccessToken)
  }, [])

  useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        console.debug("Opening bottom sheet")
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);

  const wsUrl = stampRecordId ? paths.ws.claimStampRecord(stampRecordId) : undefined;
  console.debug("wsUrl=", wsUrl)
  const { lastMessage, connected } = useWebSocket(wsUrl, accessToken ?? undefined);

  // listen to websocket messages
  useEffect(() => {
    console.debug("last message changed:", lastMessage)
    if (lastMessage?.type === "stamp_record_claimed") {
      console.debug("received claim event:", lastMessage);
      console.debug("toast:", lastMessage.claimed_by.first_name)
      bottomSheetRef.current?.dismiss();
      setStampRecordClaimed(true);
      Toast.show({
        type: "success",
        text1: "Stamp recorded claimed!",
        text2: `Thank you ${lastMessage.claimed_by.first_name} 🎉`
      })
    }
  }, [lastMessage]);

  const handleExpire = async (stampRecordId: string, trigger: "button" | "timeout"): Promise<void> => {
    // TODO need to rethink the lifecycle of this component: 
    // - After one stamp is created, how can we gracefully create another stamp
    // - How do we clear the form fields if successful, but persist them if not.
    // if (stampRecordClaimed) return;
    try {
      const new_state_value = trigger === "button" ? StampRecordState.REVOKED : StampRecordState.EXPIRED
      const res = await stampRecordUpdateState(stampRecordId, { state: new_state_value });
      console.debug(`Updated stampRecordId=${stampRecordId}'s state to ${res.state}`);
      bottomSheetRef.current?.dismiss();
      Toast.show({
        type: "error",
        text1: "Stamp record cancelled"
      })
    } catch (error) {
      // TODO render error. 
      console.warn("Error updating stamp record state", error);
    } finally {
      setStampRecordId(null);
    }
  };

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
      setStampRecordId(response.stampRecordId);
      setSheetContent(
        <StampRecordDisplay
          stampRecordId={response.stampRecordId}

          createdAt={response.createdAt}
          claimBy={response.claimBy}
          onExpire={handleExpire}
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