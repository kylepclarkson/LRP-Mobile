import { useAuthContext } from "@/lib/context/auth";
import { View } from "react-native";
import { Text } from "react-native";

export default function ProfileScreen() {

  const { user } = useAuthContext();
  return (
    <View>
      <Text>Profile screen</Text>
      <Text>Hello {user?.first_name}</Text>
    </View>
  )
}
