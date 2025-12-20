import { StampCard } from "@/types/stamps";
import Entypo from '@expo/vector-icons/Entypo';
import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";

type StampProgressProps = {
  card: StampCard;
  size?: number;
  filledColor?: string;
  emptyColor?: string;
  animate?: boolean;
  animationDelay?: number;
};

export function StampProgress({
  card,
  size = 22,
  filledColor = "#16a34a",
  emptyColor = "#9ca3af",
  animate = false,
  animationDelay = 60,
}: StampProgressProps) {
  const earned = card.stampRecords.length
  const required = card.stampDefinition.stampsRequired

  // ✅ Build a single ordered list
  const items = Array.from({ length: required }).map((_, i) => ({
    key: `stamp-${i}`,
    filled: i < earned,
  }))

  const renderIcon = (
    item: { key: string; filled: boolean },
    index: number
  ) => {
    const iconName = item.filled ? "star" : "star-outlined"
    const color = item.filled ? filledColor : emptyColor

    if (!animate) {
      return (
        <Entypo
          key={item.key}
          name={iconName}
          size={size}
          color={color}
          style={{ marginRight: 6, marginBottom: 6 }}
        />
      )
    }

    return (
      <MotiView
        key={item.key}
        from={{ opacity: 0, translateY: 6 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 250,
          delay: index * animationDelay,
        }}
        style={{ marginRight: 6, marginBottom: 6 }}
      >
        <Entypo name={iconName} size={size} color={color} />
      </MotiView>
    )
  }

  return (
    <View className="flex-row flex-wrap mt-3">
      {items.map((item, idx) => renderIcon(item, idx))}
    </View>
  )
}