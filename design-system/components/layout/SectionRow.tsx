import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

export interface SectionRowProps {
  icon: ReactNode
  label: string
  onPress?: () => void
  showDivider?: boolean
}

export function SectionRow({
  icon,
  label,
  onPress,
  showDivider = false,
}: SectionRowProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        className="p-4 active:opacity-70"
      >
        <View className="flex-row items-center">
          {icon}
          <Text className="ml-3 text-base font-medium text-gray-900">
            {label}
          </Text>
        </View>
      </Pressable>

      {showDivider && <View className="h-[1px] bg-gray-200" />}
    </>
  )
}