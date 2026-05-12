import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

function ThemedButton({ style, disabled, ...props }) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.btn, 
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style
      ]} 
      disabled={disabled}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 10,
    marginVertical: 10
  },
  pressed: {
    opacity: 0.5
  },
  disabled: {
    opacity: 0.4,
    backgroundColor: Colors.primaryMuted ?? Colors.primary,
  },
})

export default ThemedButton