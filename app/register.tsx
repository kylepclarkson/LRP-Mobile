import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function RegisterScreen() {

  const router = useRouter();

  const handleLoginRedirect = () => {
    router.replace('/');
  }

  return (
    <View>
      <Text>Register screen</Text>
      <Text>
        Already collecting rewards?{' '}
        <Text
          onPress={handleLoginRedirect}
        >log in</Text>
      </Text>

    </View>
  )
}