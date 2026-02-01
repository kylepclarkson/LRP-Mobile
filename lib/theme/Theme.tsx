import React from "react";
import { useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "./index";

export function Theme({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  console.debug("usingTheme:", JSON.stringify(theme))
  return <View style={[{ flex: 1 }, theme]}>{children}</View>;
}