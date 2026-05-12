import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function ThemedIconButton({ icon, color, backgroundColor, onPress, style }) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={color} />
    </Pressable>
  )
}

export default ThemedIconButton

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 10,
  },
})