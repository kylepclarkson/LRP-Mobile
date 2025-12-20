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
  animationDelay = 60
}: StampProgressProps) {
  const earned = card.stampRecords.length;
  const required = card.stampDefinition.stampsRequired;

  const filledIcons = Array.from({ length: earned });
  const emptyIcons = Array.from({ length: required - earned });

  const renderIcon = (
    key: string,
    iconName: React.ComponentProps<typeof Entypo>["name"],
    color: string,
    index: number
  ) => {
    if (!animate) {
      return (
        <Entypo
          key={key}
          name={iconName}
          size={size}
          color={color}
          style={{ marginRight: 6, marginBottom: 6 }}
        />
      )
    }
    return <MotiView
      key={key}
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 6 }}
      transition={{
        type: "timing",
        duration: 250,
        delay: index * animationDelay
      }}
      style={{ marginRight: 6, marginBottom: 6 }}
    >
      <Entypo name={iconName} size={size} color={color} />
    </MotiView >
      ;
  }

  return (
    <View className="flex-row flex-wrap mt-3">
      {filledIcons.map((_, idx) =>
        renderIcon(`filled-${idx}`, "star", filledColor, idx)
      )}

      {emptyIcons.map((_, idx) =>
        renderIcon(`empty-${idx}`, "star-outlined", emptyColor, idx)
      )}
    </View>
  );
}