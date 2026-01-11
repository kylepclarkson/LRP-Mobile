import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function CreateStampRecordScreen() {

  const { stampDefinitionId } = useLocalSearchParams<{ stampDefinitionId: string }>();

  return (
    <View>
      <Text>Create stamp record screen: {stampDefinitionId}</Text>
    </View>
  )
}