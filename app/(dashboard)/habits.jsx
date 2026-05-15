import { StyleSheet, FlatList, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useHabits } from "../../hooks/useHabits";
import { useRouter } from "expo-router"
import { Spacing, FontSize } from '../../constants/Spacing'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedLoader from "../../components/ThemedLoader";
import ThemedHabitCard from "../../components/ThemedHabitCard"
import ThemedButton from "../../components/ThemedButton"

const Habits = () => {
  const { habits, isLoadingHabits, loadHabits, deleteHabit } = useHabits();
  const router = useRouter()
  const [error, setError] = useState(null)

  useEffect(() => {
    loadHabits().catch(() => {
      setError("Failed to load habits. Please try again.")
    });
  }, [loadHabits]);

  const handleCreate = () => router.push("/create")

  const handleEdit = (habit) => {
    router.push({ 
      pathname: `/edit/${habit.id}`, 
      params: {
        initialName: habit.name,
        initialType: habit.type,
      }
    })
  }

  const handleDelete = async (habit) => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHabit(habit.id)
            } catch (error){
              Alert.alert('Error', error.message)
            }
          }
        }
      ]
    )
  }
  
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Manage Habits
      </ThemedText>
      <Spacer />

      {isLoadingHabits ? (
        <ThemedLoader />
      ) : error ? (
        <ThemedText style={styles.centerText}>{error}</ThemedText>
      ) : habits.length === 0 ? (
        <ThemedText style={styles.centerText}>No habits yet — tap + to add your first one</ThemedText>
      ) : ( 
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ThemedHabitCard
              habit={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />
      )}

      {!isLoadingHabits && (
        <ThemedButton style={styles.addButton} onPress={handleCreate}>
          <ThemedText style={styles.addButtonText}>+ Add Habit</ThemedText>
        </ThemedButton>
      )}
    </ThemedView>
  )
}

export default Habits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: Spacing.xxl,
  },
  heading: {
    fontWeight: "bold",
    fontSize: FontSize.xl,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: Spacing.screenPaddingHorizontal,
    paddingBottom: 180,
  },
  centerText: {
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  addButton: {
    position: "absolute",
    left: Spacing.xl,
    right: Spacing.xl,
    bottom: Spacing.md,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: FontSize.md,
  },
})