import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'
import { HabitProvider } from "../contexts/HabitContext";
import { HabitCompletionProvider } from '../contexts/HabitCompletionContext'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'

const RootLayoutInner = () => {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
      <StatusBar value="style" />
      <Stack screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
      }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="contact" options={{ title: 'Contact' }} />
      </Stack>
    </>
  )
}

const RootLayout = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <HabitProvider>
          <HabitCompletionProvider>
            <RootLayoutInner />
          </HabitCompletionProvider>
        </HabitProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
