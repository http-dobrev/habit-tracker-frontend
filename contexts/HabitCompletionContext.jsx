import { createContext, useCallback, useEffect, useState } from "react";
import {
    getTodayHabits as apiGetTodayHabits,
    updateHabitCompletion as apiUpdateHabitCompletion,
} from "../lib/api";
import { useUser } from "../hooks/useUser";

export const HabitCompletionContext = createContext(null);

export function HabitCompletionProvider({ children }) {
    const { user } = useUser();

    const [dailyHabits, setDailyHabits] = useState([]);
    const [isLoadingDailyHabits, setIsLoadingDailyHabits] = useState(false);

    useEffect(() => {
        if (!user?.token) {
            setDailyHabits([]);
        }
    }, [user?.token]);

    const loadTodayHabits = useCallback(async () => {
        if (!user?.token) {
            setDailyHabits([]);
            return;
        }
        try {
            setIsLoadingDailyHabits(true);
            const data = await apiGetTodayHabits(user.token);
            setDailyHabits(data);
            return data;
        } catch (error) {
            console.error("Error loading today's habits:", error);
            throw error;
        } finally {
            setIsLoadingDailyHabits(false);
        }
    }, [user?.token]);

    const updateHabitCompletion = useCallback(async (habitId, completed) => {
        if (!user?.token) {
            throw new Error("You must be logged in to update a habit.");
        }

        const updated = await apiUpdateHabitCompletion(habitId, completed, user.token);
        setDailyHabits(prev =>
            prev.map(h => h.habitId === habitId ? updated : h)
        );
        return updated;
    }, [user?.token]);

    return (
        <HabitCompletionContext.Provider
            value={{
                dailyHabits,
                isLoadingDailyHabits,
                loadTodayHabits,
                updateHabitCompletion,
            }}
        >
            {children}
        </HabitCompletionContext.Provider>
    );
}