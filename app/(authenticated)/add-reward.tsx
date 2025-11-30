import CreateStampRecordForm from "@/components/forms/CreateStampRecordForm";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { isEmployee, snapPointValues } from "@/lib/util";
import { StampDefinition } from "@/types/types";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";


export default function AddRewardScreen() {
  const { user } = useAuthContext();
  const {
    activeEmployeeGroup,
    stampDefinitions,
    activeStampDefinition,
    setActiveStampDefinition
  } = useBusinessContext();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => snapPointValues, []);
  const [sheetContent, setSheetContent] = useState<() => JSX.Element>(() => () => <></>);

  const openBottomSheet = (renderContent: () => JSX.Element) => {
    setSheetContent(() => renderContent);
    bottomSheetRef.current?.expand();
  };


  // Close the sheet
  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // Handle selecting an item
  const handleSelect = useCallback((item: StampDefinition) => {
    setActiveStampDefinition(item);
    closeBottomSheet();
  }, [closeBottomSheet]);

  const redirectToEmployeeSettings = () => {
    router.replace("/(authenticated)/settings/employee-settings");
  };

  const isFocused = useIsFocused();
  // Close sheet when navigating away. 
  useEffect(() => {
    if (!isFocused) {
      bottomSheetRef.current?.close();
    }
  }, [isFocused]);
  return (
    <View className="flex-1 px-6">
      <Text className="text-xl font-semibold text-gray-900">
        Add reward screen
      </Text>
      {isEmployee(user) && (
        // Employee section
        <>
          {/* TODO replace with selection */}
          {/* <View className="bg-blue-50 px-4 py-3 rounded-md mb-6">
            {activeEmployeeGroup ? (
              <Text className="text-base font-medium text-blue-900">
                Your current role: {activeEmployeeGroup.business.name} - {activeEmployeeGroup.name}
              </Text>
            ) : (
              <Text className="text-base font-medium text-blue-900">
                Current role: Customer
              </Text>
            )}

            <Pressable
              onPress={redirectToEmployeeSettings}
              className="flex-row items-center mt-2"
            >
              <Ionicons name="settings-outline" size={18} color="#1D4ED8" />
              <Text className="ml-2 text-sm text-blue-700 underline">
                Change in employee settings menu
              </Text>
            </Pressable>
          </View> */}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <CreateStampRecordForm
              onOpen={openBottomSheet}
              onClose={closeBottomSheet}
            />
          </KeyboardAvoidingView>
        </>
      )}

      {/* Bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPointValues}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        {sheetContent()}
      </BottomSheet>
    </View>
  );
}