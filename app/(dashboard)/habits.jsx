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
import ThemedSearchBar from "../../components/ThemedSearchBar"
import ThemedFilterChips from "../../components/ThemedFilterChips"

const FILTERS = ['All', 'Good', 'Bad']

const Habits = () => {
  const { habits, isLoadingHabits, isDeletingHabit, loadHabits, deleteHabit } = useHabits();
  const router = useRouter()
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

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

  const filteredHabits = habits.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      activeFilter === 'All' ||
      h.type?.toLowerCase() === activeFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Manage Habits
      </ThemedText>
      <Spacer height={Spacing.md} />

      <ThemedSearchBar value={search} onChangeText={setSearch} placeholder="Search habits..." />
      <ThemedFilterChips options={FILTERS} active={activeFilter} onSelect={setActiveFilter} />

      {isLoadingHabits || isDeletingHabit ? (
        <ThemedLoader />
      ) : error ? (
        <ThemedText style={styles.centerText}>{error}</ThemedText>
      ) : filteredHabits.length === 0 ? (
        <ThemedText style={styles.centerText}>
          {habits.length === 0 ? 'No habits yet — tap + to add your first one' : 'No habits match your search'}
        </ThemedText>
      ) : (
        <FlatList
          data={filteredHabits}
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
