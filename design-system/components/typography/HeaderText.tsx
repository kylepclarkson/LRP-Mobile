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
 * INFO: Without this, text list "welcome back" is being rendered as "welcome". 
 * This issue may be rooted in the bundler or have nativewind handles typography classnames.
 * 
 * This function assists in ensuring text with white space is loaded correctly. 
 */
function normalizeTextChildren(children: React.ReactNode): React.ReactNode {
  // If it's a plain string, wrap it in a template literal
  if (typeof children === "string") {
    return `${children}`
  }

  // If it's an array of strings, join them safely
  if (Array.isArray(children) && children.every(c => typeof c === "string")) {
    return children.join("")
  }

  // Otherwise leave it alone (expressions, nested nodes, etc.)
  return children
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
      {normalizeTextChildren(children)}
    </Text>
  )
}