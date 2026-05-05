import { StyleSheet } from 'react-native'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"

const Habbits = () => {
  return (
    <ThemedView style={styles.container}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Habbits List
      </ThemedText>

    </ThemedView>
  )
}

export default Habbits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})