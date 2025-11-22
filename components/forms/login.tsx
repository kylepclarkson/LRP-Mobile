import { useAuthContext } from "@/lib/context/auth";
import { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";


export default function LoginForm() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const theme = useTheme();
  const { login, isLoadingUser, setIsLoadingUser } = useAuthContext();


  const isFormValid = () => {
    if (!email || email.trim().length === 0) {
      setError("Email is required");
      return false;
    }
    if (!password || password.trim().length === 0) {
      setError("Password is required");
      return false;
    }
    setError("");
    return true;
  }

  const handleSignIn = async () => {
    if (!isFormValid()) return;
    setIsLoadingUser(true);
    try {
      await login({ email: email!, password: password! });
    } catch (err) {
      console.error("Caught login error");
      setError("Invalid email or password");
    } finally {
      setIsLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View>
      <TextInput
        label="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder='email@gmail.com'
        mode="outlined"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry
        placeholder='password'
        mode="outlined"
        onChangeText={setPassword}
      />
      {error && <Text style={{ ...styles.errorMessage, color: theme.colors.error }}>{error}</Text>}
      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}>
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 8
  }
})

