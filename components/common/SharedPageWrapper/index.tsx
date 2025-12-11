import { View } from "react-native";

type Props = {
  children: React.ReactNode,
  className?: string
}

export default function SharedPageWrapper({ children, className }: Props) {

  return (
    <View className={className ?? "flex-1 px-6 py-8"}>
      {children}
    </View>
  );
}