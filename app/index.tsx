import LoginForm from "@/components/forms/login";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View
} from "react-native";

export default function Index() {

  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.replace('/register');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 justify-center p-4 bg-background">
        <Text className="text-center mb-5 text-surface-foreground text-xl font-semibold">
          Welcome to Aandeg
        </Text>

        <LoginForm />

        <Text className="text-center mt-4 text-surface-foreground">
          Want to start collecting rewards?{' '}
          <Text
            onPress={handleRegisterRedirect}
            className="underline text-accent-foreground"
          >
            Register now!
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}