import { ReactNode } from "react"
import { ActivityIndicator, Pressable, Text } from "react-native"

export interface BaseButtonProps {
  title?: string
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  textClassName?: string
  backgroundClassName?: string
}

export function BaseButton({
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  className = "",
  textClassName = "",
  backgroundClassName = "",
}: BaseButtonProps) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      onPressIn={onPress}
      disabled={isDisabled}
      className={`
        px-4 py-3 rounded-lg items-center justify-center active:opacity-80
        ${isDisabled ? "opacity-50" : ""}
        ${backgroundClassName}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`font-medium text-base ${textClassName}`}>
          {children ?? title}
        </Text>
      )}
    </Pressable>
  )
}