import { Feather } from '@expo/vector-icons';
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

    </Tabs>
  );
}