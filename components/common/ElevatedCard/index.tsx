import { View } from "react-native";

type Props = {
  children: React.ReactNode,
  className?: string
  overrideStyles?: boolean
}

/**
 * A card component with elevated styling to highlight its content.
 */
export default function ElevatedCard({ children, className, overrideStyles = false }: Props) {

  const finalClassName = overrideStyles ? className : `p-4 bg-white rounded-lg shadow-lg ${className ?? ""}`;

  return (
    <View className={finalClassName}>
      {children}
    </View>
  );
}