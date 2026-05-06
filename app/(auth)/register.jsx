import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'


//themed components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { register } = useUser();

  const handleSubmit =  async () => {
    setError(null);
    try {
      await register(name, email, password);
      console.log("User registered successfully");
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
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
          style={{ width: '80%', marginBottom: 20}} 
          placeholder="Name" 
          onChangeText={setName}
          value={name}
        />

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20}} 
          placeholder="Email" 
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedTextInput 
          style={{ width: '80%', marginBottom: 20}} 
          placeholder="Password" 
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true} 
        />

        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>
            Register
          </Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />
        <Link href="/login" style={styles.link}>
          <ThemedText style={{ textAlign: 'center'}}>
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
        fontSize: 18,
        marginBottom: 30,
    },
    error: {
      color: Colors.warning,
      padding: 10,
      backgroundColor: '#f5c1c8',
      borderColor: Colors.warning,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 10,
    },
})