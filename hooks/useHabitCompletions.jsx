import { useContext } from "react";
import { HabitCompletionContext } from "../contexts/HabitCompletionContext";

export function useHabitCompletions() {
    const context = useContext(HabitCompletionContext);

    if (!context) {
        throw new Error("useHabitCompletions must be used inside HabitCompletionProvider");
    }

    return context;
}