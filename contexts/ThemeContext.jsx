import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const systemScheme = useColorScheme();
    const [override, setOverride] = useState(null); // null = follow system

    useEffect(() => {
        AsyncStorage.getItem("themeOverride").then(val => {
            if (val === "light" || val === "dark") setOverride(val);
        });
    }, []);

    function toggleTheme() {
        const current = override ?? systemScheme;
        const next = current === "dark" ? "light" : "dark";
        setOverride(next);
        AsyncStorage.setItem("themeOverride", next);
    }

    const colorScheme = override ?? systemScheme ?? "light";

    return (
        <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
