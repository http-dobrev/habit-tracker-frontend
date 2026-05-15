import { createContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin, getCurrentUser } from "../lib/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

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
        await AsyncStorage.setItem('refreshToken', response.refreshToken);

        setUser({
            ...currentUser,
            token: response.token,
            refreshToken: response.refreshToken
        });
    }

    async function register(name, email, password) {
            const response = await apiRegister(name, email, password);

            if (!response || !response.token) {
                throw new Error("Invalid email or password");
            }
            
            await AsyncStorage.setItem("token", response.token);
            await AsyncStorage.setItem('refreshToken', response.refreshToken);
            const currentUser = await getCurrentUser(response.token);

            setUser({
                ...currentUser,
                token: response.token,
                refreshToken: response.refreshToken
            });
        }

    async function logout() {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) await logoutApi(refreshToken).catch(() => {});
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
        setUser(null);
    };
    
    async function initializeAuth(){
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!token || !refreshToken) { setIsInitialized(true); return; }

        try {
            const userData = await getCurrentUser(token);
            setUser({ ...userData, token, refreshToken });
        } catch {
            // Access token expired — try refresh
            try {
            const { token: newToken } = await refreshAccessToken(refreshToken);
            await AsyncStorage.setItem('token', newToken);
            const userData = await getCurrentUser(newToken);
            setUser({ ...userData, token: newToken, refreshToken });
            } catch {
            await AsyncStorage.multiRemove(['token', 'refreshToken']);
            }
        }
        setIsInitialized(true);
    };

    return (
        <UserContext.Provider value={{ user, isInitialized, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )
}