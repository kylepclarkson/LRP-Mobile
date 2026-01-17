import { cn } from "@/lib/util";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

export interface HeaderTextProps extends TextProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4
  className?: string
}

const levelStyles = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-semibold",
  4: "text-lg font-medium",
}

/**
 * A text heading component with semantic levels
 */
export function HeaderText({ children, level = 1, className, ...props }: HeaderTextProps) {
  return (
    <Text
      {...props}
      className={cn(levelStyles[level], "text-gray-900", className)}
    >
      {children}
    </Text>
  )
}