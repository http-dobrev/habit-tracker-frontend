import { TextInput } from 'react-native'
import { Colors } from '../constants/Colors'
import { useTheme } from '../contexts/ThemeContext'

const ThemedTextInput = ({ style, ...props }) => {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <TextInput 
      style = {[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style
      ]}
      placeholderTextColor={theme.iconColor}
      {...props}
    />
  )
}

export default ThemedTextInput
