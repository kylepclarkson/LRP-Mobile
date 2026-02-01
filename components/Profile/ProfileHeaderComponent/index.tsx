import { BusinessModeToggle } from "@/components/common/BusinessModeToggle";
import { UserRewardBadge } from "@/components/common/UserRewardBadge";
import { HeaderText } from "@/design-system";
import { useAuthContext } from "@/lib/context/auth";
import { useBottomSheetContext } from "@/lib/context/bottom-sheet";
import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useNotificationsContext } from "@/lib/context/notifications";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export function ProfileHeaderComponent() {
  const { user } = useAuthContext();
  const { isBusinessUser, businessMode, setBusinessMode } = useBusinessMembershipContext();

  const { onOfferRewardCreated } = useNotificationsContext();
  const { open, close } = useBottomSheetContext();

  if (!user) return null;

  // Bottom sheet content for the QR code
  const UserRewardQRSheetContent = (
    <View className="w-full mt-10 mx-auto px-2">
      <Text className="text-center my-4 text-2xl font-bold">
        Your Aandeg reward badge
      </Text>

      <View className="p-4">
        <UserRewardBadge user={user} size={200} />
      </View>

      <Text className="text-center mt-1 text-lg">
        Present your badge to an Aandeg affiliated merchant to collect your rewards 🚀
      </Text>
    </View>
  );

  // Close the sheet when a reward is issued
  // TODO - this does not seem to work. Need to debug. 
  useEffect(() => {
    console.debug("onOfferRewardCreated useEffect called", onOfferRewardCreated);
    if (!onOfferRewardCreated) return;
    return onOfferRewardCreated(() => {
      close();
    })
  }, [onOfferRewardCreated, close]);


  return (
    <View className="flex">
      {isBusinessUser && (
        <View className="flex-row justify-between items-center my-4 rounded-2xl p-4 bg-gray-200">
          <View className="flex">
            <Text className="text-md">Switch to business mode</Text>
            <Text className="font-light italic">Issue and review rewards</Text>
          </View>
          <BusinessModeToggle
            businessMode={businessMode}
            setBusinessMode={setBusinessMode}
          />
        </View>
      )}

      <View className="flex-row justify-around">
        <View className="flex justify-center items-center">
          <HeaderText level={2}>Hello {user.firstName}</HeaderText>
          <HeaderText level={4}>Welcome back</HeaderText>
        </View>

        {!businessMode && (
          <View className="flex">
            <Pressable
              onPress={() =>
                open(UserRewardQRSheetContent, [0.8]) // <— detents here
              }
              className="w-full"
            >
              <View className="w-full items-center">
                <UserRewardBadge user={user} />
                <Text className="text-center text-gray-500 mt-1 font-light italic">
                  Press to expand
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}