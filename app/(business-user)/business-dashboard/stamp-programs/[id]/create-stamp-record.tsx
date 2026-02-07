import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Create Stamp Record Screen ID={id}</Text>
    </View>
  )
}