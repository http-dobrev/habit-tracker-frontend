import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import { useState, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../contexts/ThemeContext'
import { Spacing, FontSize, Radius } from '../../constants/Spacing'

import ThemedView from '../../components/ThemedView'
import ThemedCard from '../../components/ThemedCard'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

import { Colors } from '../../constants/Colors'
import { useHabits } from "../../hooks/useHabits";

const Create = () => {
  const router = useRouter()
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const { createHabit } = useHabits()

  const [name, setName] = useState('')
  const [type, setType] = useState('good')
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setName('')
      setType('good')
    }, [])
  )

  const handleCreate = async () => {
    if (!name.trim()) return
    setLoading(true)
    await createHabit({ name: name.trim(), type })
    setLoading(false)
    router.replace('/habits')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Pressable onPress={() => router.replace('/habits')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </Pressable>

        <ThemedText title={true} style={styles.heading}>
          Add a New Habit
        </ThemedText>

        <Spacer />

        <ThemedCard style={styles.card}>
          <ThemedText style={styles.label}>Habit Name</ThemedText>
          <ThemedTextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter habit name"
            placeholderTextColor={theme.text}
            style={styles.input}
          />

          <ThemedText style={[styles.label, styles.labelSpacing]}>Habit Type</ThemedText>
          <View style={styles.typeRow}>
            <Pressable
              style={[styles.typeButton, { backgroundColor: type === 'good' ? Colors.primary : theme.uiBackground }]}
              onPress={() => setType('good')}
            >
              <ThemedText style={[styles.typeButtonText, { color: type === 'good' ? '#fff' : theme.text }]}>
                Good Habit
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.typeButton, { backgroundColor: type === 'bad' ? Colors.warning : theme.uiBackground }]}
              onPress={() => setType('bad')}
            >
              <ThemedText style={[styles.typeButtonText, { color: type === 'bad' ? '#fff' : theme.text }]}>
                Bad Habit
              </ThemedText>
            </Pressable>
          </View>
        </ThemedCard>

        <ThemedButton onPress={handleCreate} disabled={loading || !name.trim()} style={{ backgroundColor: Colors.primary }}>
          <ThemedText style={styles.buttonText}>Add Habit</ThemedText>
        </ThemedButton>

        <ThemedButton onPress={() => router.replace('/habits')} style={styles.cancelButton}>
          <ThemedText style={[styles.buttonText, { color: theme.title }]}>Cancel</ThemedText>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenPaddingHorizontal,
    paddingTop: Spacing.xxl,
  },
  backButton: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
    alignSelf: 'flex-start',
  },
  heading: {
    fontWeight: "bold",
    fontSize: FontSize.xl,
    textAlign: "center",
  },
  card: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  labelSpacing: {
    marginTop: Spacing.md,
  },
  input: {
    width: '100%',
  },
  typeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  typeButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#adadad',
    alignItems: 'center',
  },
  typeButtonText: {
    fontWeight: '600',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: FontSize.md,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 0,
  },
})