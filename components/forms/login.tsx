import { useAuthSession } from "@/lib/context/auth";
import { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";


export default function LoginForm() {

  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  const theme = useTheme();
  const { user, isLoadingUser, login, logout } = useAuthSession();


  const isFormValid = () => {
    if (!email || email.trim().length === 0) {
      setError("Email is required");
      return false;
    }
    if (!password || password.trim().length === 0) {
      setError("Password is required");
      return false;
    }
    setError(null);
    return true;
  }

  const handleSignIn = async () => {
    if (!isFormValid()) return;
    console.debug("Calling login");
    await login({ email: email!, password: password! });
    // try {
    //   await login({ email: email!, password: password! });
    // } catch (error: any) {
    //   console.error("Login error:", error);
    //   setError(error.message || "An error occurred during login");
    //   return;
    // }
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

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

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
  }
})

