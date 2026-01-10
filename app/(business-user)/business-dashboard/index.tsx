import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { StampDefinition } from "@/types/stamps";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";

type StampDefinitionListProps = {
  data: StampDefinition[],
  onPress: (item: StampDefinition) => void
}

export function StampDefinitionList({ data, onPress }: StampDefinitionListProps) {
  return (
    <View className="flex">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-200 mx-4" />
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress?.(item)}
            className="px-4 py-3 active:opacity-70"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-medium text-gray-900">
                {item.title}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}


export default function BusinessScreen() {

  const { activeBusinessRole } = useBusinessMembershipContext();
  const { stampDefinitions } = useBusinessResourceContext();

  if (!stampDefinitions) {
    return;
  }

  return (
    <View className="flex-1 px-4 py-6">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">
          {activeBusinessRole?.business.name} Rewards
        </Text>

        <Text className="text-lg text-gray-700 mt-1">
          Available Rewards
        </Text>

        <Text className="text-sm text-gray-500 mt-0.5">
          Select a reward type to issue
        </Text>
      </View>

      {/* Reward Types List */}
      <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Stamps */}
        <Pressable
          className="px-4 py-4 active:opacity-70"
        >
          <View className="flex-row items-center">
            <FontAwesome5 name="stamp" size={28} color="#374151" />
            <Text className="ml-3 text-base font-medium text-gray-900">
              Stamps
            </Text>
          </View>
        </Pressable>

        {/* Divider */}
        <View className="h-[1px] bg-gray-200" />

        {/* Points */}
        <Pressable
          className="px-4 py-4 active:opacity-70"
        >
          <View className="flex-row items-center">
            <FontAwesome5 name="coins" size={28} color="#374151" />
            <Text className="ml-3 text-base font-medium text-gray-900">
              Points
            </Text>
          </View>
        </Pressable>
      </View>
    </View>

  )
} 
