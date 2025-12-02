import { FormSelectable } from "@/components/forms/FormSelectable";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { isEmployee, snapPointValues } from "@/lib/util";
import { EmployeeGroup, getEmployeeGroupLabel } from "@/types/types";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  const { activeEmployeeGroup, setActiveEmployeeGroup } = useBusinessContext();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<() => JSX.Element>(() => () => <></>);

  const openBottomSheet = (renderContent: () => JSX.Element) => {
    setSheetContent(() => renderContent);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const isFocused = useIsFocused();
  // Close sheet when navigating away. 
  useEffect(() => {
    if (!isFocused) {
      bottomSheetRef.current?.close();
    }
  }, [isFocused]);


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
                data={user!.employeeGroups}
                getLabel={getEmployeeGroupLabel}
                onSelect={(item) => {
                  setActiveEmployeeGroup(item);
                  closeBottomSheet();
                }}
                onOpen={openBottomSheet}
              />
            </View>
          </View>
        </View>
      )}

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
        )}>
        {sheetContent()}
      </BottomSheet>
    </View>

  )
}
