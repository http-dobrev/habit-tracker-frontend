import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { useUser } from '../../hooks/useUser'
import { Colors } from '../../constants/Colors'
import { Spacing, FontSize, Radius } from '../../constants/Spacing'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const RESEND_COOLDOWN = 30

const VerifyEmail = () => {
  const router = useRouter()
  const { pendingEmail, verifyEmail, resendVerification } = useUser()
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (!pendingEmail) {
      router.replace('/register')
    }
  }, [pendingEmail])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert('Enter code', 'Please enter the verification code from your email.')
      return
    }
    try {
      setIsVerifying(true)
      await verifyEmail(code.trim())
    } catch (error) {
      Alert.alert('Verification failed', error.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    try {
      setIsResending(true)
      await resendVerification()
      setCooldown(RESEND_COOLDOWN)
    } catch (error) {
      Alert.alert('Failed to resend', error.message)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText title={true} style={styles.title}>
          Check Your Email
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          We sent a 6-digit verification code to{'\n'}
          <Text style={styles.email}>{pendingEmail}</Text>
        </ThemedText>

        <Spacer height={Spacing.xl} />

        <ThemedTextInput
          style={styles.input}
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={setCode}
          value={code}
        />

        <ThemedButton onPress={handleVerify} disabled={isVerifying || code.length < 6}>
          <Text style={styles.btnText}>
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Text>
        </ThemedButton>

        <View style={styles.resendRow}>
          <ThemedText style={styles.resendLabel}>Didn't get the code?</ThemedText>
          <ThemedButton
            onPress={handleResend}
            disabled={isResending || cooldown > 0}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : isResending ? 'Sending...' : 'Resend'}
            </Text>
          </ThemedButton>
        </View>

        <Spacer height={Spacing.lg} />

        <ThemedButton onPress={() => router.replace('/register')} style={styles.backButton}>
          <Text style={styles.backText}>Back to Register</Text>
        </ThemedButton>

        <Spacer />
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPaddingHorizontal,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.lg,
    marginBottom: Spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  email: {
    fontWeight: '700',
    color: Colors.primary,
  },
  input: {
    width: '80%',
    marginBottom: Spacing.lg,
    textAlign: 'center',
    fontSize: FontSize.lg,
    letterSpacing: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FontSize.md,
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  resendLabel: {
    fontSize: FontSize.sm,
  },
  resendButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  resendText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  backText: {
    textAlign: 'center',
    fontSize: FontSize.md,
  },
})
