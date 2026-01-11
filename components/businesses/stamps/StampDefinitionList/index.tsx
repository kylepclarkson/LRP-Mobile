import { StampDefinition } from "@/types/stamps";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";

type StampDefinitionListProps = {
  stampDefinitions: StampDefinition[],
  onPress: (item: StampDefinition) => void
}


export function StampDefinitionList({ stampDefinitions, onPress }: StampDefinitionListProps) {
  return (
    <View className="px-4 mt-4">
      <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <FlatList
          data={stampDefinitions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-gray-200" />
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onPress(item)}
              className="px-4 py-4 active:opacity-70"
            >
              <View className="flex-row items-center">
                {/* Icon for visual consistency with dashboard */}
                <FontAwesome5 name="stamp" size={22} color="#374151" />

                <Text className="ml-3 text-base font-medium text-gray-900">
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>

  )
}