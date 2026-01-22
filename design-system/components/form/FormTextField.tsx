import { cn } from "@/lib/util";
import { Text, TextInput, View } from "react-native";

interface FormTextFieldProps {
  label: string
  value: string
  onChangeText?: (text: string) => void
  placeholder?: string
  editable?: boolean
  multiline?: boolean
  numberOfLines?: number
  error?: string
  className?: string
  inputClassName?: string
}

export function FormTextField({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  multiline = false,
  numberOfLines = 4,
  error,
  className = "",
  inputClassName = "",
}: FormTextFieldProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="text-gray-800 font-medium mb-1">{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        className={cn(
          `border border-gray-300 rounded-lg px-3 py-2 text-base`,
          `${editable ? "bg-white" : "bg-gray-100 text-gray-500"}`,
          `${multiline ? "h-auto" : ""}`,
          `${inputClassName}`
        )
        }
      />

      {error && (
        <Text className="text-red-600 text-sm mt-1">{error}</Text>
      )}
    </View>
  )
}