import { StyleSheet, ScrollView, Text, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { useUser } from '../../hooks/useUser'
import { useTheme } from '../../contexts/ThemeContext'
import { Spacing, FontSize } from '../../constants/Spacing'
import { Colors } from '../../constants/Colors'
import { deleteAccount } from '../../lib/api'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import ProfileStats from './profile-stats'

const Profile = () => {
    const { logout, user } = useUser()
    const { colorScheme, toggleTheme } = useTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const [isDeletingAccount, setIsDeletingAccount] = useState(false)

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This will permanently delete your account and all your habit data. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setIsDeletingAccount(true)
                        try {
                            await deleteAccount(user.token)
                            await logout()
                        } catch {
                            Alert.alert('Error', 'Failed to delete account. Please try again.')
                            setIsDeletingAccount(false)
                        }
                    },
                },
            ]
        )
    }

    return (
        <ThemedView style={styles.container} safe={false}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Spacer />
                <ThemedText title={true} style={styles.heading}>Profile</ThemedText>
                <Spacer height={Spacing.lg} />

                {/* Account */}
                <ThemedText style={styles.sectionLabel}>ACCOUNT</ThemedText>
                <ThemedCard style={styles.infoCard}>
                    <ThemedText style={styles.emailLabel}>Name</ThemedText>
                    <ThemedText style={styles.emailValue}>{user?.name}</ThemedText>
                    <ThemedText style={styles.emailLabel}>Email</ThemedText>
                    <ThemedText style={styles.emailValue}>{user?.email}</ThemedText>
                </ThemedCard>

                <ThemedButton onPress={() => router.push('/change-password')} style={styles.outlineButton}>
                    <Text style={[styles.buttonText, { color: theme.title }]}>Change Password</Text>
                </ThemedButton>

                <Spacer height={Spacing.lg} />

                {/* Stats */}
                <ProfileStats />

                {/* Settings */}
                <ThemedText style={styles.sectionLabel}>SETTINGS</ThemedText>
                <ThemedButton onPress={toggleTheme} style={styles.outlineButton}>
                    <Text style={[styles.buttonText, { color: theme.title }]}>
                        {colorScheme === 'dark' ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
                    </Text>
                </ThemedButton>

                <Spacer height={Spacing.lg} />

                {/* Danger zone */}
                <ThemedText style={styles.sectionLabel}>DANGER ZONE</ThemedText>
                <ThemedButton onPress={logout} style={styles.outlineButton}>
                    <Text style={[styles.buttonText, { color: theme.title }]}>Logout</Text>
                </ThemedButton>
                <ThemedButton
                    onPress={handleDeleteAccount}
                    disabled={isDeletingAccount}
                    style={[styles.outlineButton, styles.deleteButton]}
                >
                    <Text style={[styles.buttonText, { color: Colors.warning }]}>
                        {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
                    </Text>
                </ThemedButton>

                <Spacer height={Spacing.xxl} />
            </ScrollView>
        </ThemedView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Spacing.xxl,
    },
    scroll: {
        paddingHorizontal: Spacing.screenPaddingHorizontal,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: FontSize.xl,
        textAlign: 'center',
    },
    sectionLabel: {
        fontSize: FontSize.sm - 1,
        fontWeight: '600',
        letterSpacing: 0.8,
        opacity: 0.5,
        marginBottom: Spacing.sm,
        marginTop: Spacing.xs,
    },
    infoCard: {
        marginBottom: Spacing.sm,
    },
    emailLabel: {
        fontSize: FontSize.sm,
        opacity: 0.5,
        marginBottom: 2,
    },
    emailValue: {
        fontSize: FontSize.md,
        fontWeight: '500',
        marginBottom: Spacing.sm,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: Spacing.xs,
    },
    deleteButton: {
        borderColor: Colors.warning,
    },
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
    },
})
