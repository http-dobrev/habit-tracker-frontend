import { useUser } from "../../hooks/useUser";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }) => {
    const { user, isInitialized } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && user !== null) {
            router.replace('/(dashboard)/habits');
        }
    }, [user, isInitialized]);
    
    if (!isInitialized || user) {
        return (
            <ThemedLoader />
        )
    }

    return children;
};

export default GuestOnly;