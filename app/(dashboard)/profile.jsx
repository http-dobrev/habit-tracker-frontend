import { StyleSheet, Text } from 'react-native'
import { useUser } from "../../hooks/useUser"
import { useTheme } from '../../contexts/ThemeContext'
import { Spacing, FontSize } from '../../constants/Spacing'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from "../../components/ThemedButton"

const Profile = () => {
  const { logout, user } = useUser()
  const { colorScheme, toggleTheme } = useTheme()
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Profile
      </ThemedText>
      <Spacer />
      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>Time to start building some habits...</ThemedText>
      <Spacer />

      <ThemedButton onPress={toggleTheme} style={styles.themeButton}>
        <Text style={styles.buttonText}>
          {colorScheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </Text>
      </ThemedButton>

      <ThemedButton onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xxl,
    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
    fontSize: FontSize.xl,
    textAlign: "center",
  },
  themeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: Spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})