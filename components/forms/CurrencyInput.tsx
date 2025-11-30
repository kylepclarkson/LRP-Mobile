import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

function formatCurrency(value: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(value);
}

type CurrencyInputProps = {
  label: string;
  value?: number;
  currencyCode?: string;
  onUpdate?: (field: { value: number; isValid: boolean }) => void;
};

export function CurrencyInput({
  label,
  value = 0,
  currencyCode = "CAD",
  onUpdate,
}: CurrencyInputProps) {
  const [rawValue, setRawValue] = useState<string>(
    value > 0 ? value.toFixed(2) : ""
  );
  const [isValid, setIsValid] = useState(true);

  const handleChange = (text: string) => {
    // Remove everything except digits and decimal point
    let cleaned = text.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    // Limit to 2 decimal places
    if (parts.length === 2) {
      parts[1] = parts[1].slice(0, 2);
      cleaned = parts[0] + "." + parts[1];
    }

    setRawValue(cleaned);

    const num = parseFloat(cleaned);
    if (isNaN(num) || num < 0) {
      setIsValid(false);
      onUpdate?.({ value: 0, isValid: false });
      return;
    }

    setIsValid(true);
    onUpdate?.({ value: num, isValid: true });
  };

  const handleBlur = () => {
    const num = parseFloat(rawValue);
    if (!isNaN(num) && num >= 0) {
      const fixed = Number(num.toFixed(2)); // round to 2 decimals
      setRawValue(formatCurrency(fixed, currencyCode));
      onUpdate?.({ value: fixed, isValid: true });
    }
  };

  const handleFocus = () => {
    // Strip formatting when focusing back in
    const cleaned = rawValue.replace(/[^0-9.]/g, "");
    setRawValue(cleaned);
  };

  return (
    <View className="space-y-2">
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      <TextInput
        value={rawValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        keyboardType="decimal-pad"
        // placeholder="$0.00"
        className={`px-3 border rounded-md bg-white text-gray-900 h-11 ${!isValid ? "border-red-500" : "border-gray-300"
          }`}
      />
      {!isValid && (
        <Text className="text-xs text-red-600">
          Please enter a non‑negative amount
        </Text>
      )}
    </View>
  );
}