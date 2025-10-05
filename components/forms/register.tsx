import React, { useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";
import { DatePickerInput } from 'react-native-paper-dates';

export default function RegisterForm() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState(undefined);

  const [dateModalIsOpen, setDateModalIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();

  const isFormValid = (): boolean => {
    if (!email || email.trim().length === 0) {
      setError("Email is required");
      return false;
    }
    if (email.indexOf('@') === -1) {
      setError("Email is invalid");
      return false;
    }
    if (!password || password.trim().length === 0) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    // TODO add name validation
    setError("");
    return true;
  }

  const handleRegistration = async () => {
    if (!isFormValid()) return;
    // TODO call backend, check response
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
      <TextInput
        style={styles.input}
        label="Confirm password"
        secureTextEntry
        placeholder='confirm password'
        mode="outlined"
        onChangeText={setConfirmPassword}
      />
      <TextInput
        label="First name"
        style={styles.input}
        autoCapitalize="words"
        mode="outlined"
        onChangeText={setFirstName}
      />
      <TextInput
        label="Last name"
        style={styles.input}
        autoCapitalize="words"
        mode="outlined"
        onChangeText={setLastName}
      />
      {/* TODO complete date input */}
      <DatePickerInput
        locale="en"
        label="Date of birth"
        value={dateOfBirth}
        onChange={setDateOfBirth}
        inputMode="start"
        style={{ width: '100%', marginTop: 8 }
        }
      />
      {error && <Text style={{ ...styles.errorMessage, color: theme.colors.error }}>{error}</Text>}
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Create account
      </Button>
    </View>
  )
};

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
});