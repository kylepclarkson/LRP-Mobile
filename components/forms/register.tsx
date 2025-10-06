import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RegisterForm() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  // The user's date of birth as string
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  // The user's date of birth as Date
  const [date, setDate] = useState(new Date());
  // Wether the date picker modal is open
  const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState<boolean>(false);

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

  const toggleDateOfBirthPicker = () => {
    setShowDateOfBirthPicker(!showDateOfBirthPicker);
  }

  const onDateOfBirthChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    if (event.type === "set") {
      setDate(selectedDate!!);
      if (Platform.OS === 'android') {
        // Prevent retoggling
        toggleDateOfBirthPicker();
        setDateOfBirth(formatDate(selectedDate!!));
      }
    } else {
      toggleDateOfBirthPicker();
    }
  }

  const formatDate = (rawDate: Date): string => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '-' + day + '-' + year;
  }

  return (
    <SafeAreaProvider>
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

      {showDateOfBirthPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onDateOfBirthChange}
          style={styles.datePicker} // iOS styling
          maximumDate={new Date()} // Prevent future dates
          minimumDate={new Date(1920, 0, 1)} // Prevent dates too far in the past
        />
      )}
      {showDateOfBirthPicker && Platform.OS === 'ios' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={toggleDateOfBirthPicker}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => {
              // iOS 
              setDateOfBirth(formatDate(date));
              toggleDateOfBirthPicker();
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showDateOfBirthPicker && (
        <Pressable
          onPress={toggleDateOfBirthPicker}
        >
          <TextInput
            style={styles.input}
            label="Date of birth"
            value={dateOfBirth}
            mode="outlined"
            onChange={setDateOfBirth}
            editable={false}
            onPressIn={toggleDateOfBirthPicker}
          />
        </Pressable>
      )}

      {error && <Text style={{ ...styles.errorMessage, color: theme.colors.error }}>{error}</Text>}
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Create account
      </Button>
    </SafeAreaProvider >
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
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  switchModeButton: {
    marginTop: 16
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 8
  },
  datePicker: {
    height: 120,
    marginTop: -10
  },
  pickerButton: {
    paddingHorizontal: 20
  }
});