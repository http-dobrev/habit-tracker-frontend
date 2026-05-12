import { createContext, useState } from "react";
import { getHabits as apiGetHabits, deleteHabit as apiDeleteHabit } from "../lib/api";
import { useUser } from "../hooks/useUser";

export const HabitContext = createContext(null);

export function HabitProvider({ children }) {
    const { user } = useUser();

    const [habits, setHabits] = useState([]);
    const [isLoadingHabits, setIsLoadingHabits] = useState(false);

    async function loadHabits() {
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
            throw new Error(error.message);
        } finally {
            setIsLoadingHabits(false);
        }
    }

    async function deleteHabit(id) {
        try {
            await apiDeleteHabit(id, user.token)

            setHabits((currentHabits) =>
            currentHabits.filter((habit) => habit.id !== id)
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    return (
        <HabitContext.Provider value={{ habits, isLoadingHabits, loadHabits, deleteHabit }}>
            {children}
        </HabitContext.Provider>
    );
}