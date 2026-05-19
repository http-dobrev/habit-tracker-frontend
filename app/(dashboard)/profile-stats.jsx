import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useHabits } from '../../hooks/useHabits'
import { Spacing, FontSize } from '../../constants/Spacing'
import { Colors } from '../../constants/Colors'
import { getHabitCompletionHistory } from '../../lib/api'
import {
    getCurrentStreak,
    getBestStreak,
    getTotalCompletions,
    getCompletionRateLast7Days,
    getPerHabitStats,
} from '../../lib/statsUtils'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'

const ProfileStats = () => {
    const { user } = useUser()
    const { habits, loadHabits } = useHabits()

    const [stats, setStats] = useState(null)
    const [topHabits, setTopHabits] = useState([])

    useEffect(() => {
        if (!user?.token) return
        loadHabits()
        getHabitCompletionHistory(user.token)
            .then(history => {
                console.log('history length:', history?.length)
                console.log('history sample:', JSON.stringify(history?.[0]))
                setStats({
                    currentStreak: getCurrentStreak(history),
                    bestStreak: getBestStreak(history),
                    totalCompletions: getTotalCompletions(history),
                    last7DaysRate: getCompletionRateLast7Days(history),
                })
                setTopHabits(getPerHabitStats(history, habits).slice(0, 3))
            })
            .catch(e => console.error('history error:', e.message))
    }, [user?.token])

    useEffect(() => {
        if (!stats || habits.length === 0) return
        getHabitCompletionHistory(user.token)
            .then(history => setTopHabits(getPerHabitStats(history, habits).slice(0, 3)))
            .catch(() => {})
    }, [habits])

    if (!stats) return null

    return (
        <>
            <ThemedText style={styles.sectionLabel}>YOUR STATS</ThemedText>
            <View style={styles.statsGrid}>
                <ThemedCard style={styles.statCard}>
                    <ThemedText title={true} style={styles.statValue}>{stats.currentStreak}</ThemedText>
                    <ThemedText style={styles.statLabel}>Current Streak</ThemedText>
                    <ThemedText style={styles.statUnit}>days</ThemedText>
                </ThemedCard>
                <ThemedCard style={styles.statCard}>
                    <ThemedText title={true} style={styles.statValue}>{stats.bestStreak}</ThemedText>
                    <ThemedText style={styles.statLabel}>Best Streak</ThemedText>
                    <ThemedText style={styles.statUnit}>days</ThemedText>
                </ThemedCard>
                <ThemedCard style={styles.statCard}>
                    <ThemedText title={true} style={styles.statValue}>{stats.totalCompletions}</ThemedText>
                    <ThemedText style={styles.statLabel}>Total Done</ThemedText>
                    <ThemedText style={styles.statUnit}>all time</ThemedText>
                </ThemedCard>
                <ThemedCard style={styles.statCard}>
                    <ThemedText title={true} style={styles.statValue}>{stats.last7DaysRate}%</ThemedText>
                    <ThemedText style={styles.statLabel}>Last 7 Days</ThemedText>
                    <ThemedText style={styles.statUnit}>rate</ThemedText>
                </ThemedCard>
            </View>

            {topHabits.length > 0 && (
                <>
                    <Spacer height={Spacing.sm} />
                    <ThemedText style={styles.sectionLabel}>TOP HABITS</ThemedText>
                    {topHabits.map((h, i) => (
                        <ThemedCard key={h.habitId} style={styles.topHabitCard}>
                            <View style={styles.topHabitRow}>
                                <View style={styles.topHabitRank}>
                                    <ThemedText title={true} style={styles.rankText}>#{i + 1}</ThemedText>
                                </View>
                                <View style={styles.topHabitInfo}>
                                    <ThemedText title={true} style={styles.topHabitName}>{h.name}</ThemedText>
                                    <ThemedText style={styles.topHabitSub}>
                                        {h.totalCompleted} completion{h.totalCompleted !== 1 ? 's' : ''}
                                    </ThemedText>
                                </View>
                                <View style={[
                                    styles.typeBadge,
                                    { backgroundColor: h.type === 'GOOD' ? Colors.primary : Colors.warning }
                                ]}>
                                    <Text style={styles.typeBadgeText}>{h.type}</Text>
                                </View>
                            </View>
                        </ThemedCard>
                    ))}
                </>
            )}

            <Spacer height={Spacing.lg} />
        </>
    )
}

export default ProfileStats

const styles = StyleSheet.create({
    sectionLabel: {
        fontSize: FontSize.sm - 1,
        fontWeight: '600',
        letterSpacing: 0.8,
        opacity: 0.5,
        marginBottom: Spacing.sm,
        marginTop: Spacing.xs,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    statCard: {
        width: '47%',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        marginBottom: 0,
    },
    statValue: {
        fontSize: FontSize.xxl,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: FontSize.sm,
        marginTop: 2,
        opacity: 0.7,
        textAlign: 'center',
    },
    statUnit: {
        fontSize: FontSize.sm - 2,
        opacity: 0.4,
        marginTop: 1,
    },
    topHabitCard: {
        marginBottom: Spacing.sm,
    },
    topHabitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    topHabitRank: {
        width: 28,
        alignItems: 'center',
    },
    rankText: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        opacity: 0.4,
    },
    topHabitInfo: {
        flex: 1,
    },
    topHabitName: {
        fontSize: FontSize.md,
        fontWeight: '600',
    },
    topHabitSub: {
        fontSize: FontSize.sm,
        opacity: 0.5,
        marginTop: 2,
    },
    typeBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: 99,
    },
    typeBadgeText: {
        color: '#fff',
        fontSize: FontSize.sm - 2,
        fontWeight: '700',
    },
})
