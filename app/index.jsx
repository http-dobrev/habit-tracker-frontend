import { StyleSheet, Text} from 'react-native'
import { Link, Redirect } from 'expo-router'
import { useUser } from "../hooks/useUser"

import Logo from '../assets/img/logo-light.png'
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedLoader from '../components/ThemedLoader'

const Home = () => {

  const { user, isInitialized } = useUser();

  if (!isInitialized) {
    return <ThemedLoader />;
  }

  if (user) {
    return <Redirect href="/(dashboard)/habits" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer height={20}/>

      <ThemedText style={styles.title} title={true}>
        The Number 1
      </ThemedText>

      <Spacer height={10}/>
      <ThemedText>Habit Tracking Application</ThemedText>
      <Spacer />

      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home

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
  },
})  