import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'

import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const Contact = () => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText style={styles.title} title={true}>
        Contact Page
      </ThemedText>

      <Link href="/" style={styles.link}>
        <ThemedText>Back to Home</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  }
})