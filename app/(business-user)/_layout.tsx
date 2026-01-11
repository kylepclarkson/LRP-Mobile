import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function BusinessUserLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="user"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>
      <Tabs.Screen
        name="business-dashboard"
        options={{
          title: "Business Dashboard",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5
              name="store-alt"
              size={size}
              color={color}
            />
          )
        }}>
      </Tabs.Screen>

      {/* Non Tab screens from child folders */}
      <Tabs.Screen name="stamp-definitions" options={{ href: null }} />
      <Tabs.Screen name="stamp-records" options={{ href: null }} />
    </Tabs>
  );
}