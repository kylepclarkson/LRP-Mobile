import { Picker } from "@react-native-picker/picker";
import { styled } from "nativewind";
import React, { useReducer } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { formReducer, initialFormState } from "./reducer";

// NativeWind styled components
const StyledPicker = styled(Picker);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledView = styled(View);

export default function CreateStampRecordForm() {
  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = () => {
    if (!form.errors.currencyAmount && !form.errors.details && form.currencyAmount) {
      console.log("Submitting form:", form);
    } else {
      console.log("Form has errors:", form.errors);
    }
  };

  return (
    <StyledView className="p-4 space-y-4">
      <StyledPicker
        selectedValue={form.currencyCode}
        onValueChange={(val) => dispatch({ type: "SET_CODE", payload: val })}
        className="border border-gray-300 rounded bg-white"
      >
        <Picker.Item label="CAD" value="CAD" />
        <Picker.Item label="USD" value="USD" />
      </StyledPicker>

      <StyledTextInput
        value={form.currencyAmount !== null ? form.currencyAmount.toFixed(2) : ""}
        onChangeText={(val) => dispatch({ type: "SET_AMOUNT", payload: val })}
        keyboardType="decimal-pad"
        placeholder="Amount"
        className="border border-gray-300 rounded p-2"
      />
      {form.errors.currencyAmount && (
        <StyledText className="text-red-500">{form.errors.currencyAmount}</StyledText>
      )}

      <StyledTextInput
        value={form.details}
        onChangeText={(val) => dispatch({ type: "SET_DETAILS", payload: val })}
        placeholder="Details"
        className="border border-gray-300 rounded p-2"
      />
      {form.errors.details && (
        <StyledText className="text-red-500">{form.errors.details}</StyledText>
      )}
      <Pressable onPress={handleSubmit}><Text>Submit</Text></Pressable>
      {/* <Button title="Submit" onPress={handleSubmit}>Submit</Button> */}
      {/* <Button title="Reset" onPress={() => dispatch({ type: "RESET" })} /> */}
    </StyledView>
  );
}