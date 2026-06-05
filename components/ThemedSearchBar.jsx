import { TextInput, View, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { Spacing, FontSize } from '../constants/Spacing'
import { useTheme } from '../contexts/ThemeContext'

const ThemedSearchBar = ({ value, onChangeText, placeholder = "Search..." }) => {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.uiBackground, color: theme.title ?? theme.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  )
}

export default ThemedSearchBar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPaddingHorizontal,
    marginBottom: Spacing.sm,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
  },
})
