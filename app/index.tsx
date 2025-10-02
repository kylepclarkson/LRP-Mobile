import LoginForm from "@/components/forms/login";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { Text } from "react-native-paper";

export default function Index() {

  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.replace('/register');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">Welcome to Aandeg</Text>
        <LoginForm />
        <Text style={styles.redirectText}>
          Want to start collecting rewards?{' '}
          <Text
            onPress={handleRegisterRedirect}
            style={styles.redirectLink}
          >Register now!</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  redirectText: {
    textAlign: "center",
    marginTop: 16
  },
  redirectLink: {
    textDecorationLine: "underline",
    color: 'blue'
  }
})

