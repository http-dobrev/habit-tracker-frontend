import { createContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin, getCurrentUser } from "../lib/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    async function login(email, password) {
        try {
            const response = await apiLogin(email, password);

            if (!response || !response.token) {
                throw new Error("Invalid email or password");
            }

            await AsyncStorage.setItem("token", response.token);

            const currentUser = await getCurrentUser(response.token);

            setUser({
                ...response.user,
                token: response.token,
            });

            return response;
        } catch (error) {
            throw Error(error.message);
        }
    }

    async function register(name, email, password) {
            try {
                const response = await apiRegister(name, email, password);

                if (!response || !response.token) {
                    throw new Error("Invalid email or password");
                }
                
                await AsyncStorage.setItem("token", response.token);

                const currentUser = await getCurrentUser(response.token);

                setUser({
                    ...response.user,
                    token: response.token,
                });

                return response;
            } catch (error) {
                throw new Error(error.message);
            }
        }

    async function logout() {
        try {
            await AsyncStorage.removeItem("token");
            setUser(null);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error); 
        }
    }
    
    async function initializeAuth() {
        try {
            const token = await AsyncStorage.getItem("token");
            
            console.log("Stored token:", token);
            
            if (token) {
                const currentUser = await getCurrentUser(token);
                
                console.log("Current user from /auth/me:", currentUser);    

                setUser({
                    ...currentUser,
                    token,
                });

                console.log("User authenticated:", currentUser.email);
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