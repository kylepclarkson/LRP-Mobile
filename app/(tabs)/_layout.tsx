import { Tabs } from "expo-router";
    import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function TabsLayout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons 
              name="menu"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}