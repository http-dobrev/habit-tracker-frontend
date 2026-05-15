import { createContext, useCallback, useEffect, useState } from "react";
import { 
    createHabit as apiCreateHabit,  
    getHabits as apiGetHabits,
    updateHabit as apiUpdateHabit,
    deleteHabit as apiDeleteHabit, 
} from "../lib/api";
import { useUser } from "../hooks/useUser";

export const HabitContext = createContext(null);

export function HabitProvider({ children }) {
    const { user } = useUser();

    const [habits, setHabits] = useState([]);
    const [isLoadingHabits, setIsLoadingHabits] = useState(false);

    useEffect(() => {
        if (!user?.token) {
            setHabits([]);
        }
    }, [user?.token]);

    const createHabit = useCallback(async (habitData) => {
        if (!user?.token) {
            throw new Error("You must be logged in to create a habit.");
        }

        const habit = await apiCreateHabit(habitData, user.token);
        setHabits((currentHabits) => [...currentHabits, habit]);
        return habit;
    }, [user?.token]);

    const loadHabits = useCallback(async () => {
        if (!user?.token) {
            setHabits([]);
            return;
        }
        try {
            setIsLoadingHabits(true);
            const data = await apiGetHabits(user.token);
            setHabits(data);
            return data;
        } catch (error) {
            console.error("Error loading habits:", error);
            throw error;
        } finally {
            setIsLoadingHabits(false);
        }
    }, [user?.token]);

    const updateHabit = useCallback(async (id, habitData) => {
        if (!user?.token) {
            throw new Error("You must be logged in to update a habit.");
        }

        const habit = await apiUpdateHabit(id, habitData, user.token);
        setHabits(prev => prev.map(h => h.id == id ? habit : h));
        return habit;
    }, [user?.token]);

    const deleteHabit = useCallback(async (id) => {
        if (!user?.token) {
            throw new Error("You must be logged in to delete a habit.");
        }

        await apiDeleteHabit(id, user.token);
        
        setHabits((currentHabits) =>
            currentHabits.filter((habit) => String(habit.id) !== String(id))
        );
    }, [user?.token]);

    return (
        <HabitContext.Provider
            value={{
                habits,
                isLoadingHabits,
                createHabit,
                loadHabits,
                updateHabit,
                deleteHabit,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
}