import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Defines a stack navigator for all pages in the app directory
    <Stack>
      {/* Optionally configure specific screens within the stack */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }} 
      />
      {/* Other routes can be defined here or automatically picked up by the router */}
    </Stack>
  );
}