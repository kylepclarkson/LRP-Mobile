import { ReactNode } from "react"
import { View } from "react-native"

export function ListCard({ children }: { children: ReactNode }) {
  return (
    <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {children}
    </View>
  )
}