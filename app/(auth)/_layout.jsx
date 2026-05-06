import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { useUser } from "../../hooks/useUser"
//import { UserProvider } from "../../contexts/UserContext"

export default function AuthLayout() {

  const { user } = useUser();
  console.log("AuthLayout user:", user);

  return (
    <>
      <StatusBar style="auto" />
      <Stack 
        screenOptions={{ headerShown: false, animation: "none" }} 
      />
    </>

  )
}