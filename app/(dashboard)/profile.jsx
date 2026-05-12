import { StyleSheet, Text } from 'react-native'
import { useUser } from "../../hooks/useUser"

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import Themedbutton from "../../components/ThemedButton"

const Profile = () => {
  const { logout, user } = useUser()
  console.log("PROFILE USER:", user);
  return (
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        {user?.email}
      </ThemedText>
      <Spacer />

      <ThemedText>Time to start building some habits...</ThemedText>
      <Spacer />

      <Themedbutton onPress={logout}>  
        <Text style={styles.buttonText}>Logout</Text>
      </Themedbutton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})