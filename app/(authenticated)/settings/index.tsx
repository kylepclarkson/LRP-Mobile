import { useAuthContext } from "@/lib/context/auth";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";



export default function SettingsMenu() {

  const { logout } = useAuthContext();

  const menuItems = [
    { title: "Employee Settings", href: "./settings/employee-settings" },
    { title: "History", href: "/history" },
    { title: "Preferences", href: "/settings/preferences" }
  ];

  const devMenuItems = [
    { title: "Test page", href: "/test" },
    { title: "Storybook", href: "/storybook" },
  ]

  if (__DEV__) {
    menuItems.push(...devMenuItems);
  }

  return (
    <View className="flex-1 mx-4">
      <Pressable onPress={logout}>
        <View className="my-6 flex-row items-center justify-between">
          <Text className="text-base text-gray-900">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </Pressable>
      {menuItems.map((item) => (
        <Link key={item.href} href={item.href} asChild>
          <Pressable className="py-4 active:bg-gray-50">
            <View className="my-6 flex-row items-center justify-between">
              <Text className="text-base text-gray-900">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </Pressable>
        </Link>
      ))}
    </View>

  );
}