import { ReactNode } from "react"
import { Text, View } from "react-native"

export interface SectionProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ title, subtitle, children }: SectionProps) {
  return (
    <View className="mb-4">
      <View className="mb-2">
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
        {subtitle && (
          <Text className="text-md text-gray-900">{subtitle}</Text>
        )}
      </View>
      {children}
    </View>
  )
}