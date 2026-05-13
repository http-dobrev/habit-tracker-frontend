import { StyleSheet} from 'react-native'
import { Link } from 'expo-router'

import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const About = () => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText style={styles.title} title={true}>
        About Page
      </ThemedText>
      <Spacer />
      <Link href="/" style={styles.link}>
        <ThemedText>Back to Home</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  }
})