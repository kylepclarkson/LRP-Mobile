import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ListCard, ListRow } from "@/design-system";
import { StampProgram } from "@/lib/api/stamps/stamps.types";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { Text, View } from "react-native";


function EmptyStampPrograms() {
  return (
    <View className="mt-10 items-center">
      <Text className="text-gray-600">No items yet</Text>
    </View>
  )
}

export default function StampProgramsScreen() {

  const { stampPrograms, loadingStampPrograms } = useBusinessResourceContext();

  return (
    <View className="flex-1">
      {loadingStampPrograms && (
        <LoadingOverlay />
      )}

      {!loadingStampPrograms && stampPrograms.length === 0 && (
        <EmptyStampPrograms />
      )}

      {!loadingStampPrograms && stampPrograms.length > 0 && (
        <ListCard>
          {stampPrograms.map((stampProgram: StampProgram, index: number) => (
            <ListRow 
              key={stampProgram.id}
              title={stampProgram.title}
              subtitle={stampProgram.description} 
              showDivider={index < stampPrograms.length - 1}
            />
          ))}
        </ListCard>
      )}
    </View>
  )
}