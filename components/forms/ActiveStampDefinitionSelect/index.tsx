import { StampDefinition } from "@/types/types";
import { Pressable, Text, View } from "react-native";

type Props = {
  activeStampDefinition: StampDefinition | null;
  onOpen: () => void;
};

export default function ActiveStampDefinitionSelect({ activeStampDefinition, onOpen }: Props) {
  return (
    <View className="space-y-2">
      <Text className="text-sm font-medium text-gray-700 mb-1">Active stamp record</Text>
      <Pressable
        onPress={onOpen}
        className="flex-row items-center justify-between px-3 border border-gray-300 rounded-md bg-white h-11"
      >
        <Text className={activeStampDefinition ? "text-gray-900" : "text-gray-400"}>
          {activeStampDefinition ? activeStampDefinition.title : "Select a stamp definition"}
        </Text>
      </Pressable>
    </View>
  );
}