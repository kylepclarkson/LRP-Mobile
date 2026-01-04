import { UserRewardQRPayload } from "@/types/user";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";


type UserRewardQRCodeProps = {
  payload: UserRewardQRPayload;
  size?: number;
}

export function UserRewardQRCode({
  payload,
  size
}: UserRewardQRCodeProps) {

  return (
    <View className="w-full items-center justify-center">
      <QRCode
        value={JSON.stringify(payload)}
        size={size}
      />
    </View>
  )
}