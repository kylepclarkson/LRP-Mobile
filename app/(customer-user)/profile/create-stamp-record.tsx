import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormSelectable } from '@/components/forms/FormSelectable';
import { renderSelectableList } from '@/components/forms/RenderSelectableList';
import StampRecordScanDurationBar from '@/components/stamps/StampRecordScanDurationBar';
import { useBusinessMembershipContext } from '@/lib/context/business-membership';
import { CreateStampCardRequest, CreateStampCardResponse, createStampRecord } from '@/lib/services/stamps.service';
import { StampDefinition } from "@/types/stamps";
import { getStampDefinitionLabel } from '@/types/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useIsFocused } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type CurrencyData = {
  value: number,
  isValid: boolean
}

export default function CreateStampRecord() {

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element>(<></>);

  const DEFAULT_CURRENCY_DATA: CurrencyData = { value: 0, isValid: true };
  const [currencyData, setCurrencyData] = useState<CurrencyData>(DEFAULT_CURRENCY_DATA);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [createStampCardResponse, setCreateStampCardResponse] = useState<CreateStampCardResponse | null>(null);

  // TODO double tap seems to be required to open the bottom sheet. 
  // It is kind of fixed by setTimeout, but requestAnimationFrame works even less often. 
  // Seems to be an underlying issue with the gorhom package. 
  const openBottomSheet = (sheetContent: JSX.Element) => {
    setSheetContent(sheetContent);
    setTimeout(() => bottomSheetRef.current?.expand(), 100);
    // requestAnimationFrame(() => bottomSheetRef.current?.expand());
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  }
  const isFocused = useIsFocused();
  // Close sheet when navigating away. 
  useEffect(() => {
    if (!isFocused) {
      closeBottomSheet();
    }
  }, [isFocused]);

  const validateFormData = (): boolean => {
    return currencyData.isValid
  }

  useEffect(() => {
    setFormIsValid(validateFormData())
  }, [currencyData])

  const handleCreateStampRecordPress = async () => {
    const req: CreateStampCardRequest = {
      stampDefinitionId: activeStampDefinition!.id,
      transaction: {
        amount: currencyData.value,
        currencyCode: "CAD"
      }
    }
    if (!formIsValid) {
      console.debug("Form is not valid");
      return;
    }
    setCurrencyData(DEFAULT_CURRENCY_DATA);
    try {
      const response = await createStampRecord(req);
      console.debug("response", response);
      setCreateStampCardResponse(response);
    } catch (error) {
      console.error("Failed to create stamp record", error);
    }
  }

  useEffect(() => {
    if (createStampCardResponse) {
      openBottomSheet(
        <View className="p-4">
          <StampRecordScanDurationBar
            createdAt={createStampCardResponse.createdAt}
            onComplete={() => closeBottomSheet()}
          />
          <View className="items-center my-4">
            <QRCode
              value={String(createStampCardResponse.stampRecordId)}
              size={200}
              color="black"
            />
            <Text className="mt text-gray-800">Scan this code to redeem</Text>
          </View>
        </View>
      );
    }
  }, [createStampCardResponse]);


  const {
    activeStampDefinition,
    setActiveStampDefinition,
    stampDefinitions
  } = useBusinessMembershipContext();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="mx-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            Create Stamp Record
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            Business:
          </Text>
        </View>

        {/* Stamp Definition Selection */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Select an active stamp to create a record for
          </Text>
          {(activeStampDefinition && stampDefinitions) && (
            <FormSelectable<StampDefinition>
              label="Active stamp record"
              placeholder="Select a stamp definition"
              activeItem={activeStampDefinition}
              getLabel={getStampDefinitionLabel}
              onOpen={() =>
                openBottomSheet(
                  renderSelectableList(
                    stampDefinitions,
                    getStampDefinitionLabel,
                    (item) => {
                      setActiveStampDefinition(item);
                      closeBottomSheet();
                    }
                  )
                )
              }
            />
          )}
        </View>

        {/* Transaction Amount */}
        <View className="mb-6">
          <CurrencyInput
            label="Transaction amount"
            onUpdate={({ value, isValid }) =>
              setCurrencyData({ value, isValid })
            }
          />
        </View>

        {/* Action Button */}
        <View className="items-center mt-4">
          <Pressable
            className="w-full bg-blue-600 rounded-lg py-3 shadow-md active:bg-blue-700"
            onPress={handleCreateStampRecordPress}
          >
            <Text className="text-white font-semibold text-center text-lg">
              Create Stamp Record
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom Sheet */}
      <CommonBottomSheet
        ref={bottomSheetRef}
        content={sheetContent}
        onClose={closeBottomSheet}
      />
    </View>

  )
}