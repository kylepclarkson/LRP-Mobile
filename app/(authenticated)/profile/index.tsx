import CommonBottomSheet from "@/components/common/CommonBottomSheet";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { FormSelectable } from "@/components/forms/FormSelectable";
import { renderSelectableList } from "@/components/forms/RenderSelectableList";
import { EmployeeComponent } from "@/components/Profile/EmployeeComponent";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { isEmployee } from "@/lib/util";
import { EmployeeGroup, getEmployeeGroupLabel } from "@/types/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
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
    <SharedPageWrapper>
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-bold pl-2">Aandeg</Text>
        {/* TODO Nativewind 5 does not seem to work for images */}
        <Image
          source={require('../../../assets/images/aandeg-icon.png')}
          alt="Aandeg logo"
          style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: 'black' }}
        />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Hello {user!.firstName}
      </Text>

      {/* Employee Group Selector */}
      {(isEmployee(user) && activeEmployeeGroup) && (
        <EmployeeComponent
          openBottomSheet={openBottomSheet}
          closeBottomSheet={closeBottomSheet}
        />
      )}
      <CommonBottomSheet
        ref={bottomSheetRef}
        content={sheetContent}
        onClose={closeBottomSheet}
      />
    </SharedPageWrapper>
  )
}
