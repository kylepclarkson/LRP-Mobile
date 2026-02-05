import { Image } from 'expo-image';
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const logo = require('@/assets/images/aandeg-icon.png');

function HomePageHeader() {
  return (
    <View className="h-20 flex-row items-center justify-center px-4 py-1 bg-primary">
      {/* Left-aligned logo that auto-scales to header height */}
      <View className="absolute left-6 h-full justify-center">
        <View className='rounded-full bg-primary-content'>
          <Image
            source={logo}
            style={styles.logo}
            className="h-full w-auto"
            contentFit="contain"
          />
        </View>
      </View>

      {/* Centered title */}
      <Text className="text-xl font-semibold text-primary-content">Aandeg</Text>
    </View>
  );
}


export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <HomePageHeader />
        }}
      />
      <Stack.Screen name="business" options={{ headerShown: false }} />
    </Stack>
  );
}

// Note: Expo image does not support classname prop for styling so stylesheet is used. 
const styles = StyleSheet.create({
  logo: {
    height: "100%",
    width: undefined,
    aspectRatio: 1,
  },
});
