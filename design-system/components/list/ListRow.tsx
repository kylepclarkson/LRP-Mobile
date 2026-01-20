import { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"

export interface ListRowProps {
  title: string
  subtitle?: string
  right?: ReactNode
  bottom?: ReactNode
  onPress?: () => void
  showDivider?: boolean
}

export function ListRow({
  title,
  subtitle,
  right,
  bottom,
  onPress,
  showDivider = false,
}: ListRowProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        className="px-4 py-4 active:opacity-70"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">{title}</Text>
            {subtitle && (
              <Text className="text-sm text-gray-600 mt-0.5">{subtitle}</Text>
            )}
            {bottom && (
              <View className="mt-2">
                {bottom}
              </View>
            )}
          </View>

          {right}
        </View>
      </Pressable>

      {showDivider && <View className="h-[1px] bg-gray-200" />}
    </>
  )
}