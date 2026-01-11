import { useStampRecordQRCode } from "@/lib/hooks/useStampRecordQRCode";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import StampRecordScanDurationBar from "../StampRecordScanDurationBar";

type StampRecordDisplayProps = {
  stampRecordId: string;
  createdAt: Date;
  claimBy: Date;
  onExpire: (stampRecordId: string, trigger: 'button' | 'timeout') => Promise<void>;
}

/**
 * Displays a stamp record as a QR code.
 */
export function StampRecordDisplay({
  stampRecordId,
  createdAt,
  claimBy,
  onExpire
}: StampRecordDisplayProps) {

  // True if the stamp record's state has been set to expired.
  const [hasExpired, setHasExpired] = useState(false);
  const { encode } = useStampRecordQRCode();

  useEffect(() => {
    setHasExpired(false);
  }, [stampRecordId])

  const handleExpire = (trigger: 'button' | 'timeout') => {
    if (hasExpired) return;
    setHasExpired(true);
    onExpire(stampRecordId, trigger);
  }

  return (
    <View className="grow mt-10 px-4">
      <View className="items-center my-4">
        <Text className="text-4xl font-bold">Claim your stamp</Text>
        <Text className="text-md font-light">Scan the QR code using the Aandeg app</Text>
      </View>
      <View className="grow items-center justify-center">
        <QRCode
          value={encode(stampRecordId)}
          size={200}
          color="black"
        />
        <View className="my-4 w-100">
          <StampRecordScanDurationBar
            onComplete={() => handleExpire("timeout")}
            createdAt={createdAt}
            duration={claimBy.getTime() - createdAt.getTime()}
          />
        </View>
      </View>
      <View className="items-center mb-4">
        <Pressable
          className="w-full bg-blue-600 rounded-lg py-3 shadow-md active:bg-blue-700"
          onPress={() => handleExpire("timeout")}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  )
}