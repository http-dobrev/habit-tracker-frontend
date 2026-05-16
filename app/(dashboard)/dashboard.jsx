import { StyleSheet, FlatList, View } from "react-native"
import { useState, useCallback } from "react"
import { useColorScheme } from "react-native"
import { useFocusEffect } from "expo-router"
import { Spacing, FontSize } from "../../constants/Spacing"
import { Colors } from "../../constants/Colors"

import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedCard from "../../components/ThemedCard"
import ThemedLoader from "../../components/ThemedLoader"
import ThemedDailyHabitCard from "../../components/ThemedDailyHabitCard"
import DateHeader from "../../components/DateHeader"
import Spacer from "../../components/Spacer"

import { useHabitCompletions } from "../../hooks/useHabitCompletions"

const Dashboard = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const { dailyHabits, isLoadingDailyHabits, loadTodayHabits, updateHabitCompletion } = useHabitCompletions()
    const [error, setError] = useState(null)

    useFocusEffect(
        useCallback(() => {
            loadTodayHabits().catch(() => {
                setError("Failed to load today's habits. Please try again.")
            })
        }, [loadTodayHabits])
    )

    const handleToggle = async (habitId, completed) => {
        try {
            await updateHabitCompletion(habitId, completed)
        } catch {
            // toggle silently fails — UI stays in sync via context
        }
    }

    const totalCount = dailyHabits.length
    const completedCount = dailyHabits.filter(h => h.completed).length
    const successCount = dailyHabits.filter(h =>
        (h.completed)
    ).length
    const dailyScore = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0

    return (
        <ThemedView style={styles.container} safe={false}>
            <ThemedText title={true} style={styles.heading}>Today</ThemedText>
            <DateHeader />

            <Spacer height={Spacing.lg} />

            {isLoadingDailyHabits ? (
                <ThemedLoader />
            ) : error ? (
                <ThemedText style={styles.centerText}>{error}</ThemedText>
            ) : dailyHabits.length === 0 ? (
                <ThemedText style={styles.centerText}>
                    No habits for today — add some from the Habits tab
                </ThemedText>
            ) : (
                <FlatList
                    data={dailyHabits}
                    keyExtractor={(item) => item.habitId.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <ThemedDailyHabitCard
                            habit={item}
                            onToggle={handleToggle}
                        />
                    )}
                    ListFooterComponent={
                        <View style={styles.statsRow}>
                            <ThemedCard style={styles.statCard}>
                                <ThemedText title={true} style={styles.statValue}>
                                    {dailyScore}%
                                </ThemedText>
                                <ThemedText style={styles.statLabel}>Daily Score</ThemedText>
                            </ThemedCard>

                            <ThemedCard style={styles.statCard}>
                                <ThemedText title={true} style={styles.statValue}>
                                    {completedCount}/{totalCount}
                                </ThemedText>
                                <ThemedText style={styles.statLabel}>Progress</ThemedText>
                            </ThemedCard>
                        </View>
                    }
                />
            )}
        </ThemedView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.screenPaddingHorizontal,
        paddingTop: Spacing.screenPaddingTop,
    },
    heading: {
        fontWeight: "bold",
        fontSize: FontSize.xxl,
        marginBottom: Spacing.xs,
    },
    list: {
        paddingBottom: Spacing.xxl,
    },
    centerText: {
        textAlign: "center",
        marginTop: Spacing.lg,
    },
    statsRow: {
        flexDirection: "row",
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    statCard: {
        flex: 1,
        alignItems: "center",
        paddingVertical: Spacing.lg,
    },
    statValue: {
        fontSize: FontSize.xxl,
        fontWeight: "bold",
        marginBottom: Spacing.xs,
    },
    statLabel: {
        fontSize: FontSize.sm,
    },
})