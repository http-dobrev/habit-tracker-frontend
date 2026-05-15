import { useUser } from "../../hooks/useUser";
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }) => {
    const { user, isInitialized } = useUser();
    
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!isInitialized) return;

        const inAuthGroup =
            segments[0] === "(auth)";

        // User NOT logged in
        if (!user && !inAuthGroup) {
            router.replace("/login");
        }

        // User IS logged in
        if (user && inAuthGroup) {
            router.replace("/(dashboard)/dashboard");
        }
    }, [user, isInitialized]);
    
    if (!isInitialized || !user) {
        return (
            <ThemedLoader />
        )
    }

    return children;
};

export default UserOnly;