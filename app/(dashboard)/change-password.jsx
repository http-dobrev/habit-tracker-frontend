import { StyleSheet, Text, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { useUser } from '../../hooks/useUser'
import { useTheme } from '../../contexts/ThemeContext'
import { Spacing, FontSize } from '../../constants/Spacing'
import { Colors } from '../../constants/Colors'
import { changePassword } from '../../lib/api'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'

const ChangePassword = () => {
    const { user } = useUser()
    const { colorScheme } = useTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        setError(null)

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.')
            return
        }
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.')
            return
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters.')
            return
        }

        setIsLoading(true)
        try {
            await changePassword(currentPassword, newPassword, user.token)
            Alert.alert('Success', 'Your password has been changed.', [
                { text: 'OK', onPress: () => router.back() },
            ])
        } catch {
            setError('Current password is incorrect or the request failed.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText title={true} style={styles.heading}>Change Password</ThemedText>
            <Spacer height={Spacing.lg} />

            <ThemedTextInput
                style={styles.input}
                placeholder="Current password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                autoCapitalize="none"
            />
            <ThemedTextInput
                style={styles.input}
                placeholder="New password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
            />
            <ThemedTextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
            />

            {error && (
                <ThemedText style={styles.errorText}>{error}</ThemedText>
            )}

            <Spacer height={Spacing.sm} />

            <ThemedButton onPress={handleSubmit} disabled={isLoading}>
                <Text style={styles.buttonText}>
                    {isLoading ? 'Saving...' : 'Save Password'}
                </Text>
            </ThemedButton>

            <ThemedButton
                onPress={() => router.push('/profile')}
                style={[styles.cancelButton, { borderColor: theme.iconColor }]}
            >
                <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
            </ThemedButton>
        </ThemedView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.screenPaddingHorizontal,
        justifyContent: 'center',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: FontSize.xl,
        textAlign: 'center',
    },
    input: {
        marginBottom: Spacing.sm,
    },
    errorText: {
        color: Colors.warning,
        textAlign: 'center',
        marginTop: Spacing.xs,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
})
