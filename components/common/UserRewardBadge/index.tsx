import { createUserBadgePayload, stringifyBadgePayload } from "@/lib/badges/customerBadge";
import { AuthenticatedUser } from "@/types/types";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";


type UserRewardBadgeProps = {
  user: AuthenticatedUser;
  size?: number;
}

export function UserRewardBadge({
  user,
  size
}: UserRewardBadgeProps) {
  const payload = createUserBadgePayload(user.id, user.firstName, user.lastName);
  const value = stringifyBadgePayload(payload);

  return (
    <View className="w-full items-center justify-center">
      <QRCode
        value={value}
        size={size}
      />
    </View>
  )
}