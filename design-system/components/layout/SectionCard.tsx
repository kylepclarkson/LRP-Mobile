import { ReactNode } from "react"
import { View } from "react-native"

export interface SectionCardProps {
  children: ReactNode
}

export function SectionCard({ children }: SectionCardProps) {
  return (
    <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {children}
    </View>
  )
}