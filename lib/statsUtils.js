// All functions accept completions as returned by GET /habit-completions:
// [{ habitId, name, type, completionDate (ISO string), completed }]

function toDateStr(date) {
    return date.toISOString().slice(0, 10);
}

function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return toDateStr(d);
}

// Consecutive days ending today (or yesterday) where at least one habit was completed
export function getCurrentStreak(completions) {
    const completedDays = new Set(
        completions
            .filter(c => c.completed)
            .map(c => c.completionDate.slice(0, 10))
    );

    let streak = 0;
    let cursor = new Date();

    // Allow streak to still count if today has no completions yet
    if (!completedDays.has(toDateStr(cursor))) {
        cursor.setDate(cursor.getDate() - 1);
    }

    while (completedDays.has(toDateStr(cursor))) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
}

export function getBestStreak(completions) {
    const completedDays = Array.from(
        new Set(
            completions
                .filter(c => c.completed)
                .map(c => c.completionDate.slice(0, 10))
        )
    ).sort();

    if (completedDays.length === 0) return 0;

    let best = 1;
    let current = 1;

    for (let i = 1; i < completedDays.length; i++) {
        const prev = new Date(completedDays[i - 1]);
        const curr = new Date(completedDays[i]);
        const diff = (curr - prev) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
            current++;
            if (current > best) best = current;
        } else {
            current = 1;
        }
    }

    return best;
}

export function getTotalCompletions(completions) {
    return completions.filter(c => c.completed).length;
}

export function getCompletionRateLast7Days(completions) {
    const cutoff = daysAgo(7);
    const recent = completions.filter(c => c.completionDate.slice(0, 10) >= cutoff);
    if (recent.length === 0) return 0;
    const completed = recent.filter(c => c.completed).length;
    return Math.round((completed / recent.length) * 100);
}

// Returns top habits sorted by all-time completions desc
export function getPerHabitStats(completions, habits) {
    const habitMap = Object.fromEntries(habits.map(h => [h.id, h]));
    const statsMap = {};

    for (const c of completions) {
        if (!statsMap[c.habitId]) {
            statsMap[c.habitId] = { habitId: c.habitId, totalCompleted: 0 };
        }
        if (c.completed) statsMap[c.habitId].totalCompleted++;
    }

    return Object.values(statsMap)
        .map(s => ({
            ...s,
            name: habitMap[s.habitId]?.name ?? 'Unknown',
            type: habitMap[s.habitId]?.type ?? null,
        }))
        .sort((a, b) => b.totalCompleted - a.totalCompleted);
}
