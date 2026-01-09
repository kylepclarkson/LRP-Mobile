import { BusinessModeToggle } from "@/components/common/BusinessModeToggle";
import { UserRewardBadge } from "@/components/common/UserRewardBadge";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useIsFocused } from "@react-navigation/native";
import { JSX, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

export function ProfileHeaderComponent() {


  const { user } = useAuthContext();
  const { businessMode, setBusinessMode } = useBusinessMembershipContext();

  const bottomSheetRef = useRef<TrueSheet>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element | null>(null);
  const isFocused = useIsFocused();

  // The content of the user reward QR bottom sheet.
  const UserRewardQRSheetContent = () => (
    <View className="w-full mt-10 mx-auto px-2">
      <Text className="text-center my-4 text-2xl font-bold">Your Aandeg reward badge</Text>
      <View className="p-4">
        <UserRewardBadge payload={{ userId: user!.id }} size={200} />
      </View>
      <Text className="text-center mt-1 text-lg">
        Present your badge to an Aandeg affiliated merchant to collect your rewards 🚀
      </Text>
    </View>
  );

  // Close bottom sheet when page becomes focused. 
  useEffect(() => {
    const closeBottomSheet = async () => {
      if (!isFocused) {
        await bottomSheetRef.current?.dismiss();
      }
    }
    closeBottomSheet();
  }, [isFocused]);

  // Open bottom sheet when content is set. 
  useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);


  if (!user) {
    return null;
  }

  return (
    <View className="flex">
      <View className="flex-row justify-between items-center my-4 rounded-2xl p-4 bg-gray-200">
        <View className="flex">
          <Text className="text-md">Switch to business mode</Text>
          <Text className="font-light italic">Issue and review rewards</Text>
        </View>
        <BusinessModeToggle businessMode={businessMode} setBusinessMode={setBusinessMode} />
      </View>
      <View className="flex-row">
        <View className="flex-1 items-start">
          <Text className="text-xl font-bold">Hello {user?.firstName}</Text>
          <Text className="text-md">Welcome back</Text>
        </View>
        {!businessMode && (
          <View className="flex-1">
            <Pressable
              onPress={() => setSheetContent(<UserRewardQRSheetContent />)}
              className="w-full">
              <View className="w-full items-center">
                <UserRewardBadge payload={{ userId: "Hello" }} />
                <Text className="text-center text-gray-500 mt-1 font-light italic">
                  Press to expand
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
      <TrueSheet ref={bottomSheetRef} detents={[0.8]}>
        {sheetContent}
      </TrueSheet>
    </View>
  );
}