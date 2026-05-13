import { createContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin, getCurrentUser } from "../lib/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    async function login(email, password) {
        const response = await apiLogin(email, password);

        if (!response || !response.token) {
            throw new Error("Invalid email or password");
        }

        await AsyncStorage.setItem("token", response.token);
        const currentUser = await getCurrentUser(response.token);

        setUser({
            ...currentUser,
            token: response.token,
        });

        return response;
    }

    async function register(name, email, password) {
            const response = await apiRegister(name, email, password);

            if (!response || !response.token) {
                throw new Error("Invalid email or password");
            }
            
            await AsyncStorage.setItem("token", response.token);
            const currentUser = await getCurrentUser(response.token);

            setUser({
                ...currentUser,
                token: response.token,
            });

            return response;
        }

    async function logout() {
        await AsyncStorage.removeItem("token");
        setUser(null);
    }
    
    async function initializeAuth() {
        try {
            const token = await AsyncStorage.getItem("token");
            
            if (token) {
                const currentUser = await getCurrentUser(token);

                setUser({
                    ...currentUser,
                    token,
                });
            }
        } catch (error) {
            await AsyncStorage.removeItem("token");
            setUser(null);
            console.error("Error initializing authentication:", error);
        } finally {
            setIsInitialized(true);
        }
    }
    
    useEffect(() => {
        initializeAuth();
    }, []);

    return (
        <UserContext.Provider value={{ user, isInitialized, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )
}