import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

import ThemedView from '../../../components/ThemedView'
import ThemedCard from '../../../components/ThemedCard'
import ThemedText from '../../../components/ThemedText'
import ThemedTextInput from '../../../components/ThemedTextInput'
import ThemedButton from '../../../components/ThemedButton'
import Spacer from '../../../components/Spacer'

import { Colors } from '../../../constants/Colors'
import { useHabits } from "../../../hooks/useHabits";

const Edit = () => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const { updateHabit, deleteHabit } = useHabits()
  const { id, initialName, initialType } = useLocalSearchParams()

  const [name, setName] = useState(initialName ?? '')
  const [type, setType] = useState(initialType ?? 'good')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!name.trim()) return
    setLoading(true)
    await updateHabit(id, { name: name.trim(), type })
    setLoading(false)
    router.back()
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteHabit(id)
    setLoading(false)
    router.back()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.title} />
        </Pressable>

        <ThemedText title={true} style={styles.heading}>
          Edit Habit
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

          <ThemedText style={[styles.label, { marginTop: 16 }]}>Habit Type</ThemedText>
          <View style={styles.typeRow}>
            <Pressable
              style={[
                styles.typeButton,
                type === 'good'
                  ? { backgroundColor: Colors.primary }
                  : { backgroundColor: theme.uiBackground },
              ]}
              onPress={() => setType('good')}
            >
              <ThemedText
                style={[
                  styles.typeButtonText,
                  { color: type === 'good' ? '#fff' : theme.text },
                ]}
              >
                Good Habit
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.typeButton,
                type === 'bad'
                  ? { backgroundColor: Colors.warning }
                  : { backgroundColor: theme.uiBackground },
              ]}
              onPress={() => setType('bad')}
            >
              <ThemedText
                style={[
                  styles.typeButtonText,
                  { color: type === 'bad' ? '#fff' : theme.text },
                ]}
              >
                Bad Habit
              </ThemedText>
            </Pressable>
          </View>
        </ThemedCard>

        <ThemedButton
          onPress={handleSave}
          disabled={loading || !name.trim()}
          style={{ backgroundColor: Colors.primary }}
        >
          <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
        </ThemedButton>

        <ThemedButton
          onPress={handleDelete}
          disabled={loading}
          style={{ backgroundColor: Colors.warning }}
        >
          <ThemedText style={styles.buttonText}>Delete Habit</ThemedText>
        </ThemedButton>

        <ThemedButton
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <ThemedText style={[styles.buttonText, { color: theme.title }]}>
            Cancel
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
    
  )
}

export default Edit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 52,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  card: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    width: '100%',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonText: {
    fontWeight: '600',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 0,
  },
})