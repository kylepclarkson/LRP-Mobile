import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HeaderText, PressableListItem } from "@/design-system";
import { StampProgram } from "@/lib/api/stamps/stamps.types";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";


function StampProgramListItem({ stampProgram }: { stampProgram: StampProgram }) {
  return (
    <View className="flex-row justify-start items-center">
      <View className="flex bg-gray-300 rounded-xl h-12 w-12 justify-center items-center">
        <FontAwesome6 name="gift" size={24} />
      </View>
      <View className="flex-1 ml-2">
        <HeaderText level={3}>{stampProgram.title}</HeaderText>
        <HeaderText level={6}>{stampProgram.description}</HeaderText>
      </View>
    </View>
  );
}

function EmptyStampPrograms() {
  return (
    <View className="mt-10 items-center">
      <Text className="text-gray-600">No items yet</Text>
    </View>
  )
}

function StampProgramListHeader() {
  return (
    <View className="ml-2 py-4">
      <Text className="text-2xl font-bold mb-1">Stamp Programs</Text>
    </View>
  )
}

export default function StampProgramsScreen() {

  const { stampPrograms, loadingStampPrograms, refreshStampPrograms } = useBusinessResourceContext();

  return (
    <View className="flex-1">
      {loadingStampPrograms && (
        <LoadingOverlay />
      )}

      {!loadingStampPrograms && (
        <View className="flex-1">
          <FlatList
            data={stampPrograms}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={StampProgramListHeader}
            ListEmptyComponent={EmptyStampPrograms}
            refreshing={loadingStampPrograms}
            onRefresh={refreshStampPrograms}
            renderItem={({ item, index }) => (
              <PressableListItem
                key={item.id}
                onPress={() => { }
                  // router.push({
                  //   pathname: "/(customer-user)/rewards/[id]/offer-rewards-details",
                  //   params: { id: item.id }
                  // })
                }
                showDivider={index < stampPrograms.length - 1}
              >
                <StampProgramListItem stampProgram={item} />
              </PressableListItem>
            )}
          />
        </View>
      )}
    </View>
  )
}