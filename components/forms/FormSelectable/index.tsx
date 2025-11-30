import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { SelectableList } from "../SelectableList";

type FormSelectableProps<T extends { id: string }> = {
  label: string;
  placeholder: string;
  activeItem: T;
  data: T[];
  onSelect: (item: T) => void;
  onOpen: (renderContent: () => JSX.Element) => void;
  getLabel: (item: T) => string;
};

export function FormSelectable<T extends { id: string }>({
  label,
  placeholder,
  activeItem,
  data,
  onSelect,
  onOpen,
  getLabel,
}: FormSelectableProps<T>) {
  return (
    <View className="space-y-2">
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      <Pressable
        onPress={() =>
          onOpen(() => (
            <SelectableList
              data={data}
              activeItem={activeItem}
              getLabel={getLabel}
              onSelect={(item) => onSelect(item)}
            />
          ))
        }
        className="flex-row items-center justify-between px-3 border border-gray-300 rounded-md bg-white h-11"
      >
        <Text className={activeItem ? "text-gray-900" : "text-gray-400"}>
          {activeItem ? getLabel(activeItem) : placeholder}
        </Text>
      </Pressable>
    </View>
  );
}