import React, { useEffect } from "react";
import { View } from "react-native";
import { useTimedProgress } from "./hooks";

type Props = {
  createdAt: Date,
  duration?: number, // in milliseconds
  onComplete: () => void
}

export default function StampRecordScanDurationBar({ createdAt, duration, onComplete }: Props) {
  const { progress, isComplete } = useTimedProgress(createdAt, duration);

  // Execute callback when render is complete. 
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <View className="w-full mt-4">
      <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Cannot mix Nativewind with style property */}
        <View style={{ height: 8, backgroundColor: "blue", width: `${progress * 100}%` }} />
      </View>
    </View>
  );
}