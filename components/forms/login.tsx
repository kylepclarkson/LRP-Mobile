import { useAuthContext } from "@/lib/context/auth";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { LoadingOverlay } from "../common/LoadingOverlay";

export default function LoginForm() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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
      setPassword("");
    } finally {
      setIsLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return <LoadingOverlay />;
  }

  return (
    <View className="flex items-center justify-center px-6">
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Shows a keyboard with the "@" sign
        autoCapitalize="none"        // Prevents auto-capitalization
        autoComplete="email"         // Enables autofill for email on supported platforms
        textContentType="emailAddress" // iOS specific autofill hint
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"

      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}       // Hides the characters as the user types
        autoCapitalize="none"
        autoComplete="current-password" // Enables autofill for current password
        textContentType="password"      // iOS specific autofill hint
        className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <Text className="mt-3 text-sm text-red-600 font-medium">{error}</Text>
      )}
      <Pressable
        onPress={handleSignIn}
        className="mt-3 w-full rounded-md bg-blue-600 px-4 py-3 active:bg-blue-700"
      >
        <Text className="text-center text-white font-semibold">Login</Text>
      </Pressable>
    </View>
  );
}

