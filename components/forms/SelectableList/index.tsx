import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pressable, Text } from "react-native";

type SelectableListProps<T> = {
  data: T[];
  activeItem?: T;
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
};

export function SelectableList<T extends { id: string }>({
  data,
  activeItem,
  onSelect,
  getLabel
}: SelectableListProps<T>) {
  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item: T) => item.id}
      renderItem={({ item }: { item: T }) => (
        <Pressable
          onPress={() => onSelect(item)}
          className={`px-4 py-3 border-b border-gray-200 ${item.id === activeItem?.id ? "bg-blue-100" : "bg-white"}`}
        >
          <Text className="text-gray-900">{getLabel(item)}</Text>
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}