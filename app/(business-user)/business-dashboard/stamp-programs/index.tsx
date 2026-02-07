import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { BodyText, HeaderText, ListCard, ListRow, PrimaryButton } from "@/design-system";
import { StampProgram } from "@/lib/api/stamps/stamps.types";
import { useBottomSheetContext } from "@/lib/context/bottom-sheet";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


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

function StampProgramSheetContent({
  stampProgram, closeSheet
}: {
  stampProgram: StampProgram, closeSheet: () => void
}) {
  return (
    <View className="p-4">
      <HeaderText level={1} className="pb-2">{stampProgram.title}</HeaderText>
      <HeaderText level={3} className="pb-2">{stampProgram.business.name}</HeaderText>
      <ScrollView>
        <View className="pb-10">
          <HeaderText level={3} className="mt-4">Description</HeaderText>
          <BodyText className="text-accent mt-1">{stampProgram.description}</BodyText>
          <BodyText className="text-accent mt-1">Stamps required: {stampProgram.stampsRequired}</BodyText>
          <HeaderText level={3} className="mt-4">Issuance Instructions</HeaderText>
          <BodyText className="text-accent mt-1">{stampProgram.triggerInstructions}</BodyText>
          <HeaderText level={3} className="mt-4">Employee Instructions</HeaderText>
          <BodyText className="text-accent mt-1">{stampProgram.employeeInstructions}</BodyText>
          <PrimaryButton
            title="Create stamp"
            className="mt-5"
            onPress={() => {
              closeSheet();
              router.push({
                pathname: "/(business-user)/business-dashboard/stamp-programs/[id]/create-stamp-record",
                params: { id: stampProgram.id }
              })
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
};

export default function StampProgramsScreen() {

  const { stampPrograms, loadingStampPrograms, refreshStampPrograms } = useBusinessResourceContext();
  const { open, close } = useBottomSheetContext();

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
              <ListCard
                key={item.id}
              >
                <ListRow
                  key={item.id}
                  title={item.title}
                  subtitle={item.description}
                  onPress={() => { open(<StampProgramSheetContent stampProgram={item} closeSheet={close} />) }}
                  showDivider={index < stampPrograms.length - 1}
                />
              </ListCard>
              // <PressableListItem
              //   key={item.id}
              //   onPress={() => { open(<StampProgramSheetContent stampProgram={item} closeSheet={close} />) }}
              //   showDivider={index < stampPrograms.length - 1}
              // >
              //   <StampProgramListItem stampProgram={item} />
              // </PressableListItem>
            )}
          />
        </View>
      )}
    </View>
  )
}