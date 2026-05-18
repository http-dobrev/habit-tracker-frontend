import { StyleSheet, View } from "react-native"

import { Colors } from "../constants/Colors"
import ThemedText from "./ThemedText"
import { useTheme } from "../contexts/ThemeContext"

function ThemedBadge({ label, variant = "good", style }) {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const isGood = variant === "good"

  const backgroundColor = isGood
    ? Colors.primary
    : Colors.warning

  const textColor =
    colorScheme === "dark"
      ? theme.title
      : "#fff"

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
        },
        style,
      ]}
    >
      <ThemedText
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {label}
      </ThemedText>
    </View>
  )
}

export default ThemedBadge

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
})