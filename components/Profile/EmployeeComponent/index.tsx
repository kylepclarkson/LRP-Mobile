import { FormSelectable } from "@/components/forms/FormSelectable";
import { renderSelectableList } from "@/components/forms/RenderSelectableList";
import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { EmployeeGroup, getEmployeeGroupLabel } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { JSX } from "react";
import { Pressable, Text, View } from "react-native";

type EmployeeComponentProps = {
  openBottomSheet: (renderContent: JSX.Element) => void,
  closeBottomSheet: () => void,
}

/**
 * 
 */
export function EmployeeComponent({
  openBottomSheet,
  closeBottomSheet
}: EmployeeComponentProps) {

  const { user } = useAuthContext();
  const { activeEmployeeGroup, setActiveEmployeeGroup } = useBusinessContext();

  if (!user || !activeEmployeeGroup) {
    return null;
  }

  return (
    <View className="p-4 bg-white rounded-lg shadow-lg">
      <View className="flex-row justify-between items-center py-2">
        <Text className="text-2xl font-bold">Employee view</Text>
        <Pressable
          onPress={() => router.push("./profile/create-stamp-record")}
          className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center"
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>
      <FormSelectable<EmployeeGroup>
        label="Select business to create a stamp record for"
        placeholder="Select an employee group"
        activeItem={activeEmployeeGroup}
        getLabel={getEmployeeGroupLabel}
        onOpen={() =>
          openBottomSheet(
            renderSelectableList(
              user!.employeeGroups,
              getEmployeeGroupLabel,
              (item) => {
                setActiveEmployeeGroup(item);
                closeBottomSheet();
              }
            )
          )
        }
      />

    </View>
  );
}