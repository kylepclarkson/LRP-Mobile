import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddRewardScreen() {
  const { user } = useAuthContext();
  const { activeEmployeeGroup, stampDefinitions } = useBusinessContext();

  const redirectToEmployeeSettings = () => {
    router.replace("/(authenticated)/settings/employee-settings");
  };

  return (
    <View className="flex-1 px-6 my-8">
      {(user?.employeeGroups && user.employeeGroups.length > 0) && (
        <View className="bg-blue-50 px-4 py-3 rounded-md mb-6">
          {activeEmployeeGroup ? (
            <Text className="text-base font-medium text-blue-900">
              Your current role: {activeEmployeeGroup.business.name} - {activeEmployeeGroup.name}
            </Text>
          ) : (
            <Text className="text-base font-medium text-blue-900">
              Current role: Customer
            </Text>
          )}

          <Pressable
            onPress={redirectToEmployeeSettings}
            className="flex-row items-center mt-2"
          >
            <Ionicons name="settings-outline" size={18} color="#1D4ED8" />
            <Text className="ml-2 text-sm text-blue-700 underline">
              Change in employee settings menu
            </Text>
          </Pressable>
        </View>
      )}

      <Text className="text-xl font-semibold text-gray-900">
        Add reward screen
      </Text>
      {stampDefinitions && stampDefinitions.map((x) => <Text>{x.title}</Text>)}
    </View>
  );
}