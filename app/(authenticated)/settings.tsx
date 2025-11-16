import { useAuthContext } from "@/lib/context/auth";
import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
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
      <Link href="../../test" style={{ textAlign: "center", marginVertical: 12, backgroundColor: "lightgray", padding: 8, borderRadius: 4 }}>Open Test</Link>
      <Link href="../../storybook" style={{ textAlign: "center", marginVertical: 12, backgroundColor: "lightgray", padding: 8, borderRadius: 4 }}>Open Storybook</Link>
    </View>
  )
}