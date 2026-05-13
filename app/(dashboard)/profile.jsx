import { StyleSheet, Text } from 'react-native'
import { useUser } from "../../hooks/useUser"

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from "../../components/ThemedButton"

const Profile = () => {
  const { logout, user } = useUser()
  return (
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        Profile 
      </ThemedText>
      <Spacer />
      <ThemedText>{user?.email}</ThemedText>
      <ThemedText>Time to start building some habits...</ThemedText>
      <Spacer />

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
    paddingTop: 100,
    alignItems: "center",
  },
  
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})