import { useAuthContext } from "@/lib/context/auth";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { LoadingOverlay } from "../common/LoadingOverlay";

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register } = useAuthContext();

  const isFormValid = (): boolean => {
    if (!email || email.trim().length === 0) {
      setError("Email is required");
      return false;
    }
    if (email.indexOf("@") === -1) {
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
    if (!firstName || firstName.trim().length === 0) {
      setError("First name is required");
      return false;
    }
    if (!lastName || lastName.trim().length === 0) {
      setError("Last name is required");
      return false;
    }
    if (!dateOfBirth || dateOfBirth.trim().length === 0) {
      setError("Date of birth is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegistration = async () => {
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
      await register({
        email,
        password,
        date_of_birth: dateOfBirth,
        first_name: firstName,
        last_name: lastName,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDateOfBirthPicker = () => {
    setShowDateOfBirthPicker(!showDateOfBirthPicker);
  };

  const onDateOfBirthChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    if (event.type === "set") {
      setDate(selectedDate!!);
      if (Platform.OS === "android") {
        toggleDateOfBirthPicker();
        setDateOfBirth(formatDate(selectedDate!!));
      }
    } else {
      toggleDateOfBirthPicker();
    }
  };

  const formatDate = (rawDate: Date): string => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
  };

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <View className="flex px-6 py-4 bg-gray-50">
      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {/* Confirm Password */}
      <TextInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {/* First Name */}
      <TextInput
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {/* Last Name */}
      <TextInput
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {/* Date Picker */}
      {showDateOfBirthPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onDateOfBirthChange}
          maximumDate={new Date()}
          minimumDate={new Date(1920, 0, 1)}
          style={{ height: 120 }}
        />
      )}

      {showDateOfBirthPicker && Platform.OS === "ios" && (
        <View className="flex-row justify-around mt-2">
          <TouchableOpacity onPress={toggleDateOfBirthPicker}>
            <Text className="text-blue-600 font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDateOfBirth(formatDate(date));
              toggleDateOfBirthPicker();
            }}
          >
            <Text className="text-blue-600 font-semibold">Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Date of Birth Input */}
      <Pressable onPress={toggleDateOfBirthPicker}>
        <TextInput
          placeholder="Date of birth"
          value={dateOfBirth}
          editable={false}
          className="mb-4 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
        />
      </Pressable>

      {/* Error Message */}
      {error && (
        <Text className="mt-2 text-center text-sm text-red-600 font-medium">
          {error}
        </Text>
      )}

      {/* Submit Button */}
      <Pressable
        onPress={handleRegistration}
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 active:bg-blue-700"
      >
        <Text className="text-center text-white font-semibold">
          Create account
        </Text>
      </Pressable>
    </View>
  );
}