import { StyleSheet, View, Pressable } from "react-native"
import { Colors } from "../constants/Colors"
import { Spacing, Radius, FontSize } from "../constants/Spacing"
import ThemedText from "./ThemedText"
import ThemedCard from "./ThemedCard"
import ThemedBadge from "./ThemedBadge"
import { useTheme } from "../contexts/ThemeContext"

function ThemedDailyHabitCard({ habit, onToggle, style }) {
    const { colorScheme } = useTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const isBad = habit.habitType?.toUpperCase() === "BAD"
    const checkColor = isBad ? Colors.warning : Colors.primary

    return (
        <ThemedCard style={[styles.card, style]}>
            <Pressable
                style={styles.row}
                onPress={() => onToggle?.(habit.habitId, !habit.completed)}
            >
                <View
                    style={[
                        styles.circle,
                        {
                            borderColor: habit.completed ? checkColor : theme.text,
                            backgroundColor: habit.completed ? checkColor : "transparent",
                        },
                    ]}
                />

                <ThemedText title={true} style={styles.name}>
                    {habit.habitName}
                </ThemedText>

                <ThemedBadge
                    label={habit.habitType}
                    variant={isBad ? "bad" : "good"}
                />
            </Pressable>
        </ThemedCard>
    )
}

export default ThemedDailyHabitCard

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.sm,
        padding: Spacing.md,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: Radius.full,
        borderWidth: 2,
    },
    name: {
        flex: 1,
        fontSize: FontSize.md,
        fontWeight: "600",
    },
})