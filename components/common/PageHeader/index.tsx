import React from "react";
import { Text, View } from "react-native";

type PageHeaderProps = {
  headerText: string;
}

export function PageHeader({ headerText }: PageHeaderProps): React.JSX.Element {
  return (
    <View className="bg-white border-b border-gray-200">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-xl font-semibold text-center flex-1">{headerText}</Text>
      </View>
    </View>
  );
}