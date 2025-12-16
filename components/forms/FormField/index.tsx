// components/FormField.tsx
import { styled } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

type FormFieldProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

const StyledView = styled(View);
const StyledText = styled(Text);

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <StyledView className="space-y-1">
      {label && <StyledText className="text-gray-700 font-medium">{label}</StyledText>}
      {children}
      {error && <StyledText className="text-red-500 text-xs">{error}</StyledText>}
    </StyledView>
  );
}