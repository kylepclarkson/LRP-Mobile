import { Switch } from "react-native";

interface ModeToggleProps {
  businessMode: boolean;
  setBusinessMode: (mode: boolean) => void;
}

/**
 * A toggle switch to change between business and customer modes. 
 */
export function BusinessModeToggle({ businessMode, setBusinessMode }: ModeToggleProps) {
  return (
    <Switch
      value={businessMode}
      onValueChange={() => setBusinessMode(!businessMode)}
      trackColor={{ false: "#d1d5db", true: "#2563eb" }}
      thumbColor={businessMode ? "#ffffff" : "#f4f4f5"}
    ></Switch>
  )
}