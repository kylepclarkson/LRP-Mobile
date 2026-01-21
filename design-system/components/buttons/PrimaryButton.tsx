import { ReactNode } from "react"
import { ActivityIndicator, Pressable, Text } from "react-native"

interface PrimaryButtonProps {
  title?: string
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function PrimaryButton({
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  className = "",
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      // TODO - Content within TrueSheet does not seem to work for onPress. onPressIn seems to work. 
      onPressIn={onPress}
      disabled={isDisabled}
      className={`
        bg-blue-600 
        px-4 py-3 
        rounded-lg 
        items-center 
        justify-center 
        active:opacity-80 
        ${isDisabled ? "opacity-50" : ""} 
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-medium text-base">
          {children ?? title}
        </Text>
      )}
    </Pressable>
  )
}