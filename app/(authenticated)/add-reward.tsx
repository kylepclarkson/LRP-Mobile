import { CurrencyInput } from "@/components/forms/CurrencyInput";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { isEmployee, snapPointValues } from "@/lib/util";
import { StampDefinition } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";


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
  // Open the sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

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

  const [formState, setFormState] = useState({
    amount: { value: 0, isValid: true }
  });

  return (
    <View className="flex-1 px-6">
      <Text className="text-xl font-semibold text-gray-900">
        Add reward screen
      </Text>
      {isEmployee(user) && (
        // Employee section
        <>
          {/* TODO replace with selection */}
          <View className="bg-blue-50 px-4 py-3 rounded-md mb-6">
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
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <Pressable onPressIn={() => Keyboard.dismiss()} className="flex-1">

              <View className="space-y-2">
                <Text className="text-sm font-medium text-gray-700 mb-1">Active stamp record</Text>
                <Pressable
                  onPress={openBottomSheet}
                  className="flex-row items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <Text className={activeStampDefinition ? "text-gray-900" : "text-gray-400"}>
                    {activeStampDefinition ? activeStampDefinition.title : "Select an stamp definition"}
                  </Text>
                </Pressable>
              </View>
              <View className="space-y-2">
                <Text className="text-sm font-medium text-gray-700 mb-1">Transaction amount</Text>
                <CurrencyInput
                  value={formState.amount.value}
                  currencyCode="CAD"
                  onUpdate={({ value, isValid }: any) => {
                    setFormState((prev) => ({
                      ...prev,
                      amount: { value, isValid }
                    }))
                  }}
                />
              </View>
              <Pressable onPress={() => console.debug(formState)}>
                <Text>Button</Text>
              </Pressable>
            </Pressable>
          </KeyboardAvoidingView>
        </>
      )}

      {/* Bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={closeBottomSheet}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetFlatList
          data={stampDefinitions}
          keyExtractor={(item: StampDefinition) => item.id}
          renderItem={({ item }: { item: StampDefinition }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              className={`px-4 py-3 border-b border-gray-200 ${item.id === activeStampDefinition?.id ? "bg-blue-100" : "bg-white"
                }`}
            >
              <Text className="text-gray-900">{item.title}</Text>
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </BottomSheet>
    </View>
  );
}