import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function BusinessUserLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="home"
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="menu"
              size={size}
              color={color}
            />
          )
        }}
      />


      {/* Non Tab screens from child folders */}
      <Tabs.Screen name="stamp-definitions" options={{ href: null }} />
      <Tabs.Screen name="stamp-records" options={{ href: null }} />
    </Tabs>
  );
}