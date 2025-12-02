import CommonBottomSheet from "@/components/common/CommonBottomSheet";
import { FormSelectable } from "@/components/forms/FormSelectable";
import { renderSelectableList } from "@/components/forms/RenderSelectableList";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { isEmployee } from "@/lib/util";
import { EmployeeGroup, getEmployeeGroupLabel } from "@/types/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { JSX, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  const { activeEmployeeGroup, setActiveEmployeeGroup } = useBusinessContext();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element | null>(null);

  const openBottomSheet = (renderContent: JSX.Element) => {
    setSheetContent(renderContent);
  };
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
    if (sheetContent) {
      bottomSheetRef.current?.expand();
    }
  }, [sheetContent]);


  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">
        Hi, {user!.firstName}
      </Text>

      {/* Employee Group Selector */}
      {(isEmployee(user) && activeEmployeeGroup) && (
        <View className="mb-6 bg-lime-300 rounded-2xl">
          <View className="p-4">

            <Text className="text-base font-medium text-gray-700 mb-2">
              Employee view
            </Text>
            <View>
              <FormSelectable<EmployeeGroup>
                label="Select business to create a stamp record for"
                placeholder="Select an employee group"
                activeItem={activeEmployeeGroup}
                getLabel={getEmployeeGroupLabel}
                onOpen={() =>
                  openBottomSheet(
                    renderSelectableList(
                      user!.employeeGroups,
                      getEmployeeGroupLabel,
                      (item) => {
                        setActiveEmployeeGroup(item);
                        closeBottomSheet();
                      }
                    )
                  )
                }
              />
            </View>
            <Pressable
              onPress={() => router.push("./profile/create-stamp-record")}
              className="mt-4 bg-blue-600 rounded-lg p-3"
            >
              <Text className="text-white text-center font-semibold">
                Create Stamp Record
              </Text>
            </Pressable>

          </View>
        </View>
      )}
      <CommonBottomSheet
        ref={bottomSheetRef}
        content={sheetContent}
        onClose={closeBottomSheet}
      />
    </View>

  )
}
