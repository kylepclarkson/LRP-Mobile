import { cn } from "@/lib/util"
import { ReactNode } from "react"
import { Text, TextProps } from "react-native"

export interface CaptionProps extends TextProps {
  children: ReactNode
  className?: string
}

/**
 * For small, secondary text.
 */
export function Caption({ children, className, ...props }: CaptionProps) {
  return (
    <Text
      {...props}
      className={cn("text-sm text-gray-500", className)}
    >
      {children}
    </Text>
  )
}