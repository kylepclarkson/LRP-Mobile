import { BusinessModeToggle } from "@/components/common/BusinessModeToggle";
import { UserRewardBadge } from "@/components/common/UserRewardBadge";
import { BodyText, HeaderText } from "@/design-system";
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
    <View className="h-full px-2 ">
      <View className="bg-base-200 rounded-b-2xl z-20 p-8 flex">
        <View className="flex-row justify-around">
          <View className="flex justify-center items-center">
            <HeaderText level={2}>Hi {user.firstName} {user.lastName}</HeaderText>
            <BodyText>Welcome back</BodyText>
          </View>
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
        </View>
      </View>
      {isBusinessUser && (
        <View className="bg-accent rounded-2xl pt-10 pb-4 px-4 -mt-8 z-10">
          <View className="flex-row justify-between items-center">
            <View className="flex">
              <Text className="text-md">Switch to business mode</Text>
              <Text className="font-light italic">Issue and review rewards</Text>
            </View>
            <BusinessModeToggle
              businessMode={businessMode}
              setBusinessMode={setBusinessMode}
            />
          </View>
        </View>
      )}
    </View>
  );
}