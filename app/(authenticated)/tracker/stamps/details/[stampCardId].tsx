import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";


export default function StampCardDetailPage() {

  const {
    stampCardId
  } = useLocalSearchParams<{ stampCardId: string }>();

  return (
    <Text>Stamp card detail page {stampCardId}</Text>
  )
}