import { createUserBadgePayload, stringifyBadgePayload } from "@/lib/badges/customerBadge";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";


type UserRewardBadgeProps = {
  userId: string;
  size?: number;
}

export function UserRewardBadge({
  userId,
  size
}: UserRewardBadgeProps) {

  const payload = createUserBadgePayload(userId);
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