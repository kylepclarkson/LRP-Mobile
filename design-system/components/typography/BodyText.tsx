import { ReactNode } from "react"
import { Text, TextProps } from "react-native"
import { cn } from "@/lib/util"

export interface BodyTextProps extends TextProps {
  children: ReactNode
  className?: string
}

/**
 * The default text component. 
 */
export function BodyText({ children, className, ...props }: BodyTextProps) {
  return (
    <Text
      {...props}
      className={cn("text-base text-gray-800", className)}
    >
      {children}
    </Text>
  )
}