import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";

export function renderSelectableList<T>(
  items: T[],
  getLabel: (item: T) => string,
  onSelect: (item: T) => void
) {
  return (
    <BottomSheetView className="p-8">
      {items.map((item, idx) => (
        <Text
          key={idx}
          className="p-2 border-b border-gray-200"
          onPress={() => onSelect(item)}
        >
          {getLabel(item)}
        </Text>
      ))}
    </BottomSheetView >
  );
}