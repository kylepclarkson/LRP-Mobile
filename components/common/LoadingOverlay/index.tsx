import { ActivityIndicator, Text, View } from "react-native";

export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <View className="absolute inset-0 flex-1 z-50 items-center justify-center bg-gray-100">
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className="mt-4 text-base font-medium text-gray-700">{message}</Text>
    </View>
  );
}