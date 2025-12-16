import { Picker } from "@react-native-picker/picker";
import { styled } from "nativewind";
import React, { useReducer } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Currency } from "../Currency";
import { FormField } from "../FormField";
import { formReducer, initialFormState } from "./reducer";
import { CurrencyCode } from "./types";

// NativeWind styled components
const StyledPicker = styled(Picker<CurrencyCode>);
const inputClass = "border border-gray-300 rounded bg-white text-base";


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
    <View className="gap-y-4">
      <FormField label="Currency Code" error={form.errors.currencyCode}>
        <StyledPicker
          selectedValue={form.currencyCode}
          onValueChange={(val) => dispatch({ type: "SET_CODE", payload: val })}
          className={`${inputClass}`}
        >
          <Picker.Item label="CAD" value="CAD" />
          <Picker.Item label="USD" value="USD" />
        </StyledPicker>
      </FormField>
      <FormField label="Amount" error={form.errors.currencyAmount}>
        <Currency
          value={form.currencyAmount}
          onChange={(next) => {
            dispatch({ type: "SET_AMOUNT", payload: next !== null ? next.toString() : "" });
          }}
          inputProps={{ placeholder: "0.00" }}
          error={form.errors.currencyAmount}
          className={inputClass}
        />
      </FormField>
      <FormField label="Details (optional)" error={form.errors.details}>
        <TextInput
          value={form.details}
          onChangeText={(val) => dispatch({ type: "SET_DETAILS", payload: val })}
          placeholder="Details"
          className={`${inputClass} h-40`}
          multiline
          textAlignVertical="top"
        />
      </FormField>
      <Pressable
        className="bg-blue-500 rounded p-3 items-center mt-4"
        onPress={handleSubmit}>
        <Text className="text-white">Create stamp</Text>
      </Pressable>
    </View>
  );
}