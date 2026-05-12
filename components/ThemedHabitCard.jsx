import { StyleSheet, View } from "react-native"
import { Colors } from "../constants/Colors"

import ThemedText from "./ThemedText"
import ThemedCard from "./ThemedCard"
import ThemedBadge from "./ThemedBadge"
import ThemedIconButton from "./ThemedIconButton"

function ThemedHabitCard({ habit, onEdit, onDelete, style }) {
  const isBad = habit.type?.toLowerCase() === "bad"

  return (
    <ThemedCard style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.info}>
          <ThemedText style={styles.name}>{habit.name}</ThemedText>

          <ThemedBadge
            label={habit.type}
            variant={isBad ? "bad" : "good"}
          />
        </View>

        <View style={styles.actions}>
          <ThemedIconButton
            icon="pencil-outline"
            color={Colors.primary}
            backgroundColor="#F4F5F7"
            onPress={() => onEdit?.(habit)}
          />

          <ThemedIconButton
            icon="trash-outline"
            color="#ff3b30"
            backgroundColor="#FFF1F1"
            onPress={() => onDelete?.(habit)}
          />
        </View>
      </View>
    </ThemedCard>
  )
}

export default ThemedHabitCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
})