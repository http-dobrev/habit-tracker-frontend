import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { Spacing, FontSize } from '../constants/Spacing'
import ThemedText from './ThemedText'
import { useTheme } from '../contexts/ThemeContext'

const ThemedFilterChips = ({ options, active, onSelect }) => {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.chip,
            { backgroundColor: theme.uiBackground },
            active === option && styles.chipActive,
          ]}
          onPress={() => onSelect(option)}
        >
          <ThemedText
            style={[
              styles.chipText,
              active === option && styles.chipTextActive,
            ]}
          >
            {option}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ThemedFilterChips

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPaddingHorizontal,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
})
