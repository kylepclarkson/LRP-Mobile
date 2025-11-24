import { useAuthContext } from '@/lib/context/auth';
import { useBusinessContext } from '@/lib/context/business';
import { EmployeeGroup } from '@/types/types';
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

// Props: pass in userName, employeeGroups, activeEmployeeGroup, and onSelect
export default function EmployeeGroupsMenu() {

  const { user } = useAuthContext();
  const { activeEmployeeGroup, setActiveEmployeeGroup } = useBusinessContext();

  // Synthetic "Customer role"
  const syntheticCustomerGroup: EmployeeGroup = {
    id: "Customer",
    name: "Customer role",
    business: { id: "customer", name: "customer" }
  }

  const listGroups: EmployeeGroup[] = [syntheticCustomerGroup, ...(user?.employeeGroups ?? [])];

  const renderItem = ({ item }: { item: EmployeeGroup }) => {
    const isActive =
      (activeEmployeeGroup === null && item.id === "customer") ||
      activeEmployeeGroup?.id === item.id;

    return (
      <Pressable
        onPress={() => setActiveEmployeeGroup(item.id === "customer" ? null : item)}
        className={`px-4 py-3 border-b border-gray-200 active:bg-gray-50 ${isActive ? "bg-blue-100" : "bg-white"
          }`}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-base text-gray-900">{item.business.name}</Text>
            <Text className="text-sm text-gray-500">{item.name}</Text>
          </View>
          {isActive && <Ionicons name="checkmark" size={20} color="#2563EB" />}
        </View>
      </Pressable>
    );
  };


  return (
    <View className="flex-1 bg-gray-50 px-6 py-8">
      <Text className="text-2xl font-semibold text-gray-900 mb-2">
        Hello, {user?.firstName}
      </Text>
      <Text className="text-gray-600 mb-4">
        Here are your current employee groups:
      </Text>
      <FlatList
        data={listGroups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}