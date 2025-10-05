import RegisterForm from "@/components/forms/register";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { Text } from "react-native-paper";

export default function RegisterScreen() {

  const router = useRouter();

  const handleLoginRedirect = () => {
    router.replace('/');
  }

  return (
    // <View>
    //   <Text>Register screen</Text>
    //   <Text>
    //     Already collecting rewards?{' '}
    //     <Text
    //       onPress={handleLoginRedirect}
    //     >log in</Text>
    //   </Text>
    // </View>

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">Welcome to Aandeg</Text>
        <Text style={styles.title} variant="titleMedium">Create an account to start collecting rewards</Text>
        <RegisterForm />
        <Text style={styles.redirectText}>
          Already collecting rewards?{' '}
          <Text
            onPress={handleLoginRedirect}
            style={styles.redirectLink}
          >Register now!</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
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
});