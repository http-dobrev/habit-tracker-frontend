import { useUser } from "../../hooks/useUser";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }) => {
    const { user, isInitialized } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && user === null) {
            router.replace('/login');
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