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
        "px-5 py-2 rounded-full bg-muted",
      )}
    >
      <Text className="text-white">
        {businessMode ? "Customer Mode" : "Business Mode"}
      </Text>
    </Pressable>

  )
}