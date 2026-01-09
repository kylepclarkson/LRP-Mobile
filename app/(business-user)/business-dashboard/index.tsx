import { useBusinessResourceContext } from "@/lib/context/business-resource";
import { Text, View } from "react-native";
import { setDefaultProjectAnnotations } from "storybook/internal/preview-api";


export default function BusinessScreen() {

  const { stampDefinitions } = useBusinessResourceContext();

  if(!stampDefinitions) {
    return;
  }

  return (
    <>
      <Text>Business screen</Text>
      {stampDefinitions.map((stampDefinition, index) => (
        <View>
          <Text>{stampDefinition.title}</Text>
        </View>
      ))}
    </>
  )
} 