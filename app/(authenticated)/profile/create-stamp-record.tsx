import StampRecordScanDurationBar from '@/components/AddRewards/StampRecordScanDurationBar';
import CommonBottomSheet from '@/components/common/CommonBottomSheet';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormSelectable } from '@/components/forms/FormSelectable';
import { renderSelectableList } from '@/components/forms/RenderSelectableList';
import { useBusinessContext } from '@/lib/context/business';
import { CreateStampCardRequest, CreateStampCardResponse, createStampRecord } from '@/lib/services/rewards.service';
import { getStampDefinitionLabel, StampDefinition } from '@/types/types';
import BottomSheet from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type CurrencyData = {
  value: number,
  isValid: boolean
}

export default function CreateStampRecord() {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element>(<></>);

  const DEFAULT_CURRENCY_DATA: CurrencyData = { value: 0, isValid: true };
  const [currencyData, setCurrencyData] = useState<CurrencyData>(DEFAULT_CURRENCY_DATA);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [createStampCardResponse, setCreateStampCardResponse] = useState<CreateStampCardResponse | null>(null);

  // TODO double tap seems to be required to open the bottom sheet. 
  const openBottomSheet = (sheetContent: JSX.Element) => {
    setSheetContent(sheetContent);
    bottomSheetRef.current?.expand();
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

  useEffect(() => {
    setFormIsValid(validateFormData())
  }, [currencyData])

  const validateFormData = (): boolean => {
    return currencyData.isValid
  }

  const handleCreateStampRecordPress = async () => {
    const req: CreateStampCardRequest = {
      stampDefinitionId: activeStampDefinition!.id,
      transaction: {
        amount: currencyData.value,
        currencyCode: "CAD"
      }
    }
    const makeRequest = async (): Promise<CreateStampCardResponse> => {
      return await createStampRecord(req);
    }
    if (formIsValid) {
      setCurrencyData(DEFAULT_CURRENCY_DATA);
      const response = await makeRequest();
      console.debug("response from creating StampRecord=", response)
      setCreateStampCardResponse(response);
    } else {
      console.debug("form is not valid");
    }
  }

  const {
    activeEmployeeGroup,
    activeStampDefinition,
    setActiveStampDefinition,
    stampDefinitions
  } = useBusinessContext();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="mx-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            Create Stamp Record
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            Business: {activeEmployeeGroup?.business.name}
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
        {createStampCardResponse && <StampRecordScanDurationBar createdAt={createStampCardResponse.createdAt} durationMs={15000} />}
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