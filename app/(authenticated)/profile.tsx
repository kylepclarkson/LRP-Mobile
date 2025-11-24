import { useAuthContext } from "@/lib/context/auth";
import { useBusinessContext } from "@/lib/context/business";
import { Text, View } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  const { activeEmployeeGroup } = useBusinessContext();

  return (
    <View>
      <Text>Profile screen</Text>
      <Text>Hello {user?.firstName}</Text>
      <Text>Employee groups: {user?.employeeGroups.length}</Text>
      <Text>Active employee group: {activeEmployeeGroup?.business.name}</Text>
    </View>
  )
}
