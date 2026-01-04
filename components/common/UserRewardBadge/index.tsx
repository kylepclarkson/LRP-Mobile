import { UserRewardBadgePayload } from "@/types/user";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";


type UserRewardBadgeProps = {
  payload: UserRewardBadgePayload;
  size?: number;
}

export function UserRewardBadge({
  payload,
  size
}: UserRewardBadgeProps) {

  return (
    <View className="w-full items-center justify-center">
      <QRCode
        value={JSON.stringify(payload)}
        size={size}
      />
    </View>
  )
}