import { useState } from "react";
import { Text, TextInput, View } from "react-native";



function formatCurrency(value: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(value);
}

type CurrencyInputProps = {
  value?: number;
  currencyCode: string,
  onUpdate?: (field: { value: number; isValid: boolean }) => void; // single callback

}

export function CurrencyInput({
  value = 0,
  currencyCode = "USD",
  onUpdate,
}: CurrencyInputProps) {
  // The raw value the user types. This not the formatted value which is rendered.
  const [rawValue, setRawValue] = useState<string>(
    value > 0 ? value.toString() : ""
  );
  const [isValid, setIsValid] = useState(true);

  const handleChange = (text: string) => {
    setRawValue(text);
    const cleaned = text.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num) || num < 0) {
      setIsValid(false);
      onUpdate?.({ value: 0, isValid: false });
      return;
    }
    setIsValid(true);
    onUpdate?.({ value: num, isValid: true });
  };

  /**
   */
  const handleBlur = () => {
    const cleaned = rawValue.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num >= 0) {
      const truncated = Math.floor(num * 100) / 100; // truncate to 2 decimals
      setRawValue(formatCurrency(truncated, currencyCode));
      onUpdate?.({ value: truncated, isValid: true });
    }
  };

  const handleFocus = () => {
    const cleaned = rawValue.replace(/[^0-9.]/g, "");
    setRawValue(cleaned);
  };


  return (
    <View>
      <TextInput
        value={rawValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        keyboardType="decimal-pad"
        placeholder={`0.00 ${currencyCode}`}
        className={`px-3 py-2 rounded-md bg-white text-gray-900 ${!isValid ? "border border-red-500" : "border border-gray-300"
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
