import { UserRewardQRCode } from "@/components/common/UserRewardQRCode";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
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
    <View className="flex-row">
      <View className="flex-1">
        <Text className="text-3xl font-bold">Hello {user?.firstName}</Text>
      </View>
      <View className="flex-1">
        <Pressable className="w-full ">
          <View className="w-full items-center p-4s">
            <UserRewardQRCode payload={{ userId: "Hello" }} />
            <Text className="text-center text-gray-500 mt-1 font-light">
              Show to merchant
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
    // <SharedPageWrapper>
    //   <View className="flex-row justify-between items-center mb-6">
    //     <View className="pl-2">
    //       <Text className="text-3xl font-bold">Aandeg</Text>
    //       <Text className="text-sm italic text-gray-500">Customer Loyalty App</Text>
    //     </View>
    //     {/* TODO Nativewind 5 does not seem to work for images */}
    //     <Image
    //       source={require('../../../assets/images/aandeg-icon.png')}
    //       alt="Aandeg logo"
    //       style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: 'black' }}
    //     />
    //   </View>
    //   <Text className="text-2xl font-bold text-gray-900 mb-4">
    //     Hello {user!.firstName}
    //   </Text>

    //   {/* Employee Group Selector */}
    //   {(isEmployee(user) && activeEmployeeGroup) && (
    //     <EmployeeComponent
    //       openBottomSheet={openBottomSheet}
    //       closeBottomSheet={closeBottomSheet}
    //     />
    //   )}
    //   <CommonBottomSheet
    //     ref={bottomSheetRef}
    //     content={sheetContent}
    //     onClose={closeBottomSheet}
    //   />
    // </SharedPageWrapper>
  )
}
