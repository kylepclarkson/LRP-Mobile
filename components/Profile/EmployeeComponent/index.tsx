import { BusinessModeToggle } from "@/components/common/BusinessModeToggle";
import ElevatedCard from "@/components/common/ElevatedCard";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";


/**
 * 
 */
export function EmployeeComponent() {

  const { user } = useAuthContext();
  const { businessMode, setBusinessMode } = useBusinessContext();

  if (!user) {
    return null;
  }

  return (
    <ElevatedCard>
      <View className="flex-row justify-between items-center py-2">
        <Text className="text-2xl font-bold">Employee view</Text>
        <Pressable
          onPress={() => router.push("./profile/business")}
          className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center"
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>
      <BusinessModeToggle businessMode={businessMode} setBusinessMode={setBusinessMode} />
    </ElevatedCard>
  );
}