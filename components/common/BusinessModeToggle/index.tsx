import { cn } from "@/lib/util";
import { Pressable, Text } from "react-native";

interface ModeToggleProps {
  businessMode: boolean;
  setBusinessMode: (mode: boolean) => void;
}

/**
 * A toggle switch to change between business and customer modes. 
 */
export function BusinessModeToggle({ businessMode, setBusinessMode }: ModeToggleProps) {
  return (
    <Pressable
      onPress={() => setBusinessMode(!businessMode)}
      className={cn(
        "px-4 py-2 rounded-lg border",
        businessMode
          ? "bg-blue-600 border-blue-700"
          : "bg-gray-200 border-gray-300"
      )}
    >
      <Text
        className={cn(
          "font-medium",
          businessMode ? "text-white" : "text-gray-700"
        )}
      >
        {businessMode ? "Business Mode" : "Customer Mode"}
      </Text>
    </Pressable>


  )
}