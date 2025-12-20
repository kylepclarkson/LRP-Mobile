import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { StampCard } from "@/types/stamps";

type StampProgressProps = {
  card: StampCard;
  size?: number; 
  filledColor?: string;
  emptyColor?: string;
};

export function StampProgress({
  card,
  size = 22,
  filledColor = "#16a34a", // green-600
  emptyColor = "#9ca3af",  // gray-400
}: StampProgressProps) {
  const earned = card.stampRecords.length;
  const required = card.stampDefinition.stampsRequired;

  const filledIcons = Array.from({ length: earned });
  const emptyIcons = Array.from({ length: required - earned });

  return (
    <View className="flex-row flex-wrap mt-3">
      {filledIcons.map((_, idx) => (
        <Entypo
          key={`filled-${idx}`}
          name="star"
          size={size}
          color={filledColor}
          style={{ marginRight: 6, marginBottom: 6 }}
        />
      ))}

      {emptyIcons.map((_, idx) => (
        <Entypo
          key={`empty-${idx}`}
          name="star-outlined"
          size={size}
          color={emptyColor}
          style={{ marginRight: 6, marginBottom: 6 }}
        />
      ))}
    </View>
  );
}