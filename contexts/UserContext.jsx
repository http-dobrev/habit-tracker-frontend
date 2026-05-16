import { createContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin, getCurrentUser, verifyEmail as apiVerifyEmail, resendVerification as apiResendVerification } from "../lib/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [pendingEmail, setPendingEmail] = useState(null);

    useEffect(() => {
        initializeAuth();
    }, []);

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
        await apiRegister(name, email, password);
        setPendingEmail(email);
    }

    async function verifyEmail(code) {
        if (!pendingEmail) throw new Error("No pending email verification.");
        const response = await apiVerifyEmail(pendingEmail, code);

        if (!response || !response.token) {
            throw new Error("Verification failed. Please try again.");
        }

        await AsyncStorage.setItem("token", response.token);
        const currentUser = await getCurrentUser(response.token);
        setPendingEmail(null);
        setUser({ ...currentUser, token: response.token });
    }

    async function resendVerification() {
        if (!pendingEmail) throw new Error("No pending email verification.");
        await apiResendVerification(pendingEmail);
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

    return (
        <UserContext.Provider value={{ user, isInitialized, pendingEmail, login, register, logout, verifyEmail, resendVerification }}>
            {children}
        </UserContext.Provider>
    )
}