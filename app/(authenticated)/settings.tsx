import { useAuthContext } from "@/lib/context/auth";
import { Text } from "@react-navigation/elements";
import { View } from "react-native";
import { Button } from "react-native-paper";


export default function Menu() {

  const { logout } = useAuthContext();

  return (
    <View>

      <Text>Hello from menu</Text>
      <Button
        mode="contained"
        onPress={logout}>
        Sign out
      </Button>
    </View>
  )
}