import { ReactNode } from "react"
import { Pressable, View } from "react-native"


export interface PressableListItemProps {
  children: ReactNode,
  onPress: () => void,
  showDivider?: boolean
}


export function PressableListItem({
  children,
  onPress,
  showDivider = false
}: PressableListItemProps) {
  return (
    <>

      <Pressable
        onPress={onPress}
        className="px-4 py-4 active:opacity-70"
      >
        {children}
      </Pressable>
      {showDivider && <View className="h-[1px] bg-gray-300" />}
    </>
  )
}

