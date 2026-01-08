import { BusinessModeToggle } from "@/components/common/BusinessModeToggle";
import { PageHeader } from "@/components/common/PageHeader";
import { UserRewardBadge } from "@/components/common/UserRewardBadge";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useIsFocused } from "@react-navigation/native";
import { JSX, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  const { businessMode, setBusinessMode } = useBusinessContext();

  const bottomSheetRef = useRef<TrueSheet>(null);
  const [sheetContent, setSheetContent] = useState<JSX.Element | null>(null);

  const isFocused = useIsFocused();

  // Close sheet when navigating away. 
  useEffect(() => {
    const closeBottomSheet = async () => {
      if (!isFocused) {
        await bottomSheetRef.current?.dismiss();
      }
    }
    closeBottomSheet();
  }, [isFocused]);

  useEffect(() => {
    const openBottomSheet = async () => {
      if (sheetContent) {
        await bottomSheetRef.current?.present();
      }
    }
    openBottomSheet();
  }, [sheetContent]);

  const UserRewardQRSheetContent = () => (
    <View className="w-full mt-10 mx-auto px-2">
      <Text className="text-center my-4 text-2xl font-bold">Your Aandeg reward badge</Text>
      <View className="p-4">
        <UserRewardBadge payload={{ userId: user!.id }} size={200} />
      </View>
      <Text className="text-center mt-1 text-lg">
        Present your badge to an Aandeg client to collect your rewards 🚀
      </Text>
    </View>
  );

  const openUserRewardQRSheet = () => {
    console.debug("Opening user reward QR sheet");
    setSheetContent(<UserRewardQRSheetContent />);
  }

  return (
    <>
      <PageHeader headerText="Profile" />
      <View className="flex-row px-2 mt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-bold">Hello {user?.firstName}</Text>
          <Text className="text-md">Welcome back</Text>
        </View>
        <View className="flex-1">
          <Pressable
            onPress={openUserRewardQRSheet}
            className="w-full">
            <View className="w-full items-center">
              <UserRewardBadge payload={{ userId: "Hello" }} />
              <Text className="text-center text-gray-500 mt-1 font-light italic">
                Press to expand
              </Text>
            </View>
          </Pressable>
        </View>
        <View>
          <BusinessModeToggle businessMode={businessMode} setBusinessMode={setBusinessMode} />
        </View>
        <TrueSheet ref={bottomSheetRef} detents={[0.8]}>
          {sheetContent}
        </TrueSheet>
      </View>
    </>
  )
}
