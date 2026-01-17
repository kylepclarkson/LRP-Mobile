import { cn } from "@/lib/util"
import { ReactNode } from "react"
import { Text, TextProps } from "react-native"

export interface LabelProps extends TextProps {
  children: ReactNode
  className?: string
}

/**
 * Labels for form or section components. 
 */
export function Label({ children, className, ...props }: LabelProps) {
  return (
    <Text
      {...props}
      className={cn("text-sm font-medium text-gray-700", className)}
    >
      {children}
    </Text>
  )
}