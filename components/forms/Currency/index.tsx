// components/CurrencyInput.tsx
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type CurrencyProps = {
  value: number | null;
  onChange: (next: number | null) => void;
  maxDecimals?: number;          // The number of decimal places allowed.
  min?: number;                  // Used in validation - value must be at least this.
  className?: string;
  inputProps?: Omit<TextInputProps, "value" | "onChangeText" | "keyboardType">;
  label?: string;
  error?: string;
};

export function Currency({
  value,
  onChange,
  maxDecimals = 2,
  min = 0,
  className,
  inputProps,
  label,
  error,
}: CurrencyProps) {
  const [raw, setRaw] = React.useState<string>(() =>
    value === null ? "" : toFixedSafe(value, maxDecimals)
  );
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    // Sync external value to internal raw when parent changes it
    if (!focused) {
      setRaw(value === null ? "" : toFixedSafe(value, maxDecimals));
    }
  }, [value, focused, maxDecimals]);

  const handleChangeText = (text: string) => {
    const sanitized = sanitize(text);
    setRaw(sanitized);

    const parsed = parseCurrency(sanitized, maxDecimals);
    if (parsed === null) {
      // If empty or invalid (like just "."), emit null so parent can clear
      onChange(null);
      return;
    }

    // Enforce min bound (e.g., positive only)
    const bounded = Math.max(parsed, min);
    onChange(bounded);
  };

  const handleBlur = () => {
    setFocused(false);
    // Format to fixed decimals on blur if we have a valid number
    const parsed = parseCurrency(raw, maxDecimals);
    if (parsed !== null) {
      const fixed = toFixedSafe(parsed, maxDecimals);
      setRaw(fixed);
      onChange(parsed); // ensure parent has the parsed value
    }
  };

  const handleFocus = () => {
    setFocused(true);
    // Show raw without forced trailing zeros for easier editing
    if (value !== null) {
      setRaw(trimTrailingZeros(toFixedSafe(value, maxDecimals)));
    }
  };

  return (
    <View className="space-y-1">
      {label ? <Text className="text-gray-700">{label}</Text> : null}
      <TextInput
        value={raw}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        onFocus={handleFocus}
        keyboardType="decimal-pad"
        placeholder="0.00"
        className={className ?? "border border-gray-300 rounded p-2 bg-white"}
        {...inputProps}
      />
      {error ? <Text className="text-red-500 text-xs">{error}</Text> : null}
    </View>
  );
}

/* Helpers */

// Allow digits and a single dot. Strip other characters.
function sanitize(text: string): string {
  // Remove non-digit and non-dot
  let s = text.replace(/[^\d.]/g, "");
  // If multiple dots, keep first, remove the rest
  const firstDot = s.indexOf(".");
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
  }
  return s;
}

// Parse to number respecting maxDecimals; return null if empty or invalid
function parseCurrency(text: string, maxDecimals: number): number | null {
  if (text === "" || text === ".") return null;
  const [intPart, decPart = ""] = text.split(".");
  const trimmedDec = decPart.slice(0, maxDecimals);
  const combined = trimmedDec.length ? `${intPart}.${trimmedDec}` : intPart;
  const n = Number(combined);
  return Number.isFinite(n) ? n : null;
}

function toFixedSafe(n: number, maxDecimals: number): string {
  // Avoid floating point artifacts
  const factor = Math.pow(10, maxDecimals);
  return (Math.round(n * factor) / factor).toFixed(maxDecimals);
}

function trimTrailingZeros(s: string): string {
  // "12.50" -> "12.5", "12.00" -> "12", keep at least one decimal if user typed one
  if (!s.includes(".")) return s;
  const trimmed = s.replace(/\.?0+$/, "");
  return trimmed.length ? trimmed : "0";
}