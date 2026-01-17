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
        "px-5 py-2 rounded-full",
        businessMode ? "bg-blue-600" : "bg-gray-300"
      )}
    >
      <Text className={businessMode ? "text-white" : "text-gray-800"}>
        {businessMode ? "Customer Mode" : "Business Mode"}
      </Text>
    </Pressable>

  )
}