import { useAuthContext } from "@/lib/context/auth";
import { Text, View } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  return (
    <View>
      <Text>Profile screen</Text>
      <Text>Hello {user?.first_name}</Text>
      <Text>Employee groups: {user?.employeeGroups.length}</Text>
    </View>
  )
}
