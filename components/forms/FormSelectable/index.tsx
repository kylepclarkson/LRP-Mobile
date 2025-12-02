import { Pressable, Text, View } from "react-native";

type FormSelectableProps<T extends { id: string }> = {
  label: string;
  placeholder: string;
  activeItem: T; // The current selected option. 
  onOpen: () => void; // Called when user opens the sheet. 
  getLabel: (item: T) => string; // How to display each item.
};

export function FormSelectable<T extends { id: string }>({
  label,
  placeholder,
  activeItem,
  onOpen,
  getLabel,
}: FormSelectableProps<T>) {
  return (
    <View className="space-y-2">
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      <Pressable
        onPress={onOpen}
        className="flex-row items-center justify-between px-3 border border-gray-300 rounded-md bg-white h-11"
      >
        <Text className={activeItem ? "text-gray-900" : "text-gray-400"}>
          {activeItem ? getLabel(activeItem) : placeholder}
        </Text>
      </Pressable>
    </View>
  );
}