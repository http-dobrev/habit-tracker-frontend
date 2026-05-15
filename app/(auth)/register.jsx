import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert} from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { isValidEmail, isValidPassword, isValidName } from '../../lib/authValidator'
import { Spacing, FontSize, Radius } from '../../constants/Spacing';

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const { register } = useUser();

  const handleSubmit = async () => {
    if (!isValidName(name)) {
      Alert.alert('Invalid name', 'Please enter a name.')
      return
    }
    if (!isValidEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.')
      return
    }
    if (!isValidPassword(password)) {
      Alert.alert('Invalid password', 'Password must be at least 8 characters.')
      return
    }

    try {
      setIsLoading(true);
      await register(name, email, password);
    } catch (error) {
      Alert.alert('Registration failed', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>

        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register For an Account
        </ThemedText>

        <ThemedTextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.btn}>
            {isLoading ? 'Registering...' : 'Register'}
          </Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />
        <Link href="/login" style={styles.link}>
          <ThemedText style={styles.linkText}>
            Already have an account? Login here
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.lg,
    marginBottom: Spacing.lg,
  },
  input: {
    width: '80%',
    marginBottom: Spacing.lg,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.md,
    color: '#fff',
  },
  error: {
    color: Colors.warning,
    padding: Spacing.sm,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.sm,
  },
  linkText: {
    textAlign: 'center',
  },
})