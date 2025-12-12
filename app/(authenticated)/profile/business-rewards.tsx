import ElevatedCard from "@/components/common/ElevatedCard";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import SharedPageWrapper from "@/components/common/SharedPageWrapper";
import { useBusinessContext } from "@/lib/context/business";
import { getStampDefinitions } from "@/lib/services/api/businesses.service";
import { StampDefinition } from "@/types/types";
import React from "react";
import { Text } from "react-native";


export default function BusinessRewardsScreen() {

  const { activeEmployeeGroup } = useBusinessContext();

  const [stampDefinitions, setStampDefinitions] = React.useState<StampDefinition[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!activeEmployeeGroup) {
    return null;
  }

  React.useEffect(() => {
    const fetchStampDefinitions = async () => {
      console.debug(`Fetching stamp definitions for business rewards screen. business_id=${activeEmployeeGroup.business.id}`);
      setLoading(true);
      let response: StampDefinition[] = [];
      try {
        response = await getStampDefinitions(activeEmployeeGroup.business.id);
      } catch (error) {
        console.error("Error fetching stamp definitions for business rewards screen", error);
      } finally {
        setLoading(false);
      }
      console.debug("Response", response)
      setStampDefinitions(response);
    };

    fetchStampDefinitions();
  }, [activeEmployeeGroup]);

  if (loading) {
    return <LoadingOverlay />;
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