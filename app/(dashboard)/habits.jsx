import { StyleSheet, FlatList, View } from 'react-native'
import { useEffect } from 'react'
import { useHabits } from "../../hooks/useHabits";

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedLoader from "../../components/ThemedLoader";

const Habits = () => {
  const { habits, isLoadingHabits, loadHabits } = useHabits();

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Habits List
      </ThemedText>

      <Spacer />

      {isLoadingHabits ? (
        <ThemedLoader />
      ) : habits.length === 0 ? (
        <ThemedText style={styles.centerText}>No habits yet</ThemedText>
      ) : ( 
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.habitCard}>
              <ThemedText style={styles.habitName}>{item.name}</ThemedText>
              <ThemedText style={styles.habitType}>{item.type}</ThemedText>
            </View>
          )}
        />
      )}
    </ThemedView>
  )
}

export default Habits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})