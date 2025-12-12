import { View } from "react-native";

type Props = {
  children: React.ReactNode,
  className?: string
  overrideStyles?: boolean
}

/**
 * A wrapper component that provides consistent padding and layout for pages.
 */
export default function SharedPageWrapper({ children, className, overrideStyles = false }: Props) {

  const finalClassName = overrideStyles ? className ?? "" : `flex-1 px-6 py-8 ${className ?? ""}`;

  return (
    <View className={finalClassName}>
      {children}
    </View>
  );
}