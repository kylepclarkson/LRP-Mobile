import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";


export default function LoginScreen() {

  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">Welcome back</Text>
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
          // onPress={handleAuth}
          style={styles.button}>
          Sign In
        </Button>

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

