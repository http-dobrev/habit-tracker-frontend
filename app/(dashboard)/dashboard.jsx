import { StyleSheet, FlatList, View } from "react-native"
import { useState, useCallback, useRef } from "react"
import { useFocusEffect } from "expo-router"
import { Spacing, FontSize } from "../../constants/Spacing"
import { Colors } from "../../constants/Colors"
import { useTheme } from "../../contexts/ThemeContext"

import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedCard from "../../components/ThemedCard"
import ThemedLoader from "../../components/ThemedLoader"
import ThemedDailyHabitCard from "../../components/ThemedDailyHabitCard"
import DateHeader from "../../components/DateHeader"
import Spacer from "../../components/Spacer"

import { useHabitCompletions } from "../../hooks/useHabitCompletions"
import { useHabits } from "../../hooks/useHabits"

const Dashboard = () => {
    const { colorScheme } = useTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const { dailyHabits, isLoadingDailyHabits, loadTodayHabits, updateHabitCompletion } = useHabitCompletions()
    const { lastHabitChange } = useHabits()
    const [error, setError] = useState(null)
    const [showLoader, setShowLoader] = useState(true)
    const lastFetchedChange = useRef(null)

    useFocusEffect(
        useCallback(() => {
            const needsLoader = lastFetchedChange.current !== lastHabitChange
            if (needsLoader) setShowLoader(true)
            lastFetchedChange.current = lastHabitChange

            loadTodayHabits()
                .catch(() => {
                    setError("Failed to load today's habits. Please try again.")
                })
                .finally(() => setShowLoader(false))
        }, [loadTodayHabits, lastHabitChange])
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
            <Spacer />
            <ThemedText title={true} style={styles.heading}>Today</ThemedText>
            <DateHeader style={styles.dateHeader} />

            <Spacer height={Spacing.lg} />

            {showLoader ? (
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
                />
            )}

            {dailyHabits.length > 0 && (
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
            )}
        </ThemedView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.screenPaddingHorizontal,
        paddingTop: Spacing.xxl,
    },
    heading: {
        fontWeight: "bold",
        fontSize: FontSize.xl,
        textAlign: "center",
        marginBottom: Spacing.xs,
    },
    dateHeader: {
        textAlign: "center",
        opacity: 0.7,
    },
    list: {
        paddingBottom: 120,
    },
    centerText: {
        textAlign: "center",
        marginTop: Spacing.lg,
    },
    statsRow: {
        position: "absolute",
        bottom: Spacing.md,
        left: Spacing.screenPaddingHorizontal,
        right: Spacing.screenPaddingHorizontal,
        flexDirection: "row",
        gap: Spacing.md,
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