import { Stack } from 'expo-router'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'
import { HabitProvider } from "../contexts/HabitContext";

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return ( 
    <UserProvider>
      <HabitProvider> 
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
      </HabitProvider> 
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})