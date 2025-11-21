import { useAuthContext } from "@/lib/context/auth";
import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";


export default function Menu() {

  const { logout } = useAuthContext();

  return (
    <View>

      <Text>Hello from menu</Text>
      <TouchableOpacity className="mt-4 px-4 py-2 bg-gray-300 rounded-lg shadow-md" onPress={logout}>
        <Text className="text-white font-bold text-center">Sign out</Text>
      </TouchableOpacity>
      <Link href="../../test" style={{ textAlign: "center", marginVertical: 12, backgroundColor: "lightgray", padding: 8, borderRadius: 4 }}>Open Test</Link>
      <Link href="../../storybook" style={{ textAlign: "center", marginVertical: 12, backgroundColor: "lightgray", padding: 8, borderRadius: 4 }}>Open Storybook</Link>
    </View>
  )
}