import { useAuthSession } from "@/lib/context/auth";
import { post } from "@/lib/services/api";
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

  const { login } = useAuthSession();

  // TODO move functionality to an auth service file
  const handleSignIn = async () => {
    console.info("handleSignIn:", { email, password });
    try {
      const res = await post("user/api/login/", {
        email: email,
        password: password
      });
      console.debug("login response:", res);
      await login();
    } catch (error: any) {
      // todo handle error
      console.error("Login error:", error);
      return;
    }
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

