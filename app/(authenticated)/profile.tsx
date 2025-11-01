import { useAuthSession } from "@/lib/context/auth";
import { View } from "react-native";
import { Text } from "react-native-paper";


export default function ProfileScreen() {

  const { user } = useAuthSession();
  return (
    <View>
      <Text>Profile screen</Text>
      <Text>Hello {user?.first_name}</Text>
    </View>
  )
}
