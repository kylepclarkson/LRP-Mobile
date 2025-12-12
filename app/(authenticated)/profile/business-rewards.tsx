import ElevatedCard from "@/components/common/ElevatedCard";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { useBusinessContext } from "@/lib/context/business";
import React from "react";
import { Text } from "react-native";


export default function BusinessRewardsScreen() {

  const { activeEmployeeGroup } = useBusinessContext();

  if (!activeEmployeeGroup) {
    return null;
  }

  return (
    <SharedPageWrapper>
      <ElevatedCard>
        <Text className="text-3xl font-bold mb-2">{activeEmployeeGroup.business.name} Rewards</Text>
        <Text className="text-md italic text-gray-500">Role: {activeEmployeeGroup.name}</Text>
      </ElevatedCard>

      <ElevatedCard className="mt-4">
        <Text className="text-xl font-bold mb-2">Available Rewards</Text>
      </ElevatedCard>
    </SharedPageWrapper>
  );
}