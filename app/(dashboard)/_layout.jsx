import { Tabs } from "expo-router"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import UserOnly from "../../components/auth/UserOnly"
import { useTheme } from "../../contexts/ThemeContext"

const DashboardLayout = () => {
  const { colorScheme } = useTheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserOnly>
      <Tabs 
          screenOptions={{ 
            headerShown: false, 
            tabBarStyle: { 
                backgroundColor: theme.navBackground, 
                height: 100,
                paddingTop: 10, 
                paddingBottom: 0,
            }, 
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
          }}
      >
        <Tabs.Screen 
          name="dashboard"
          options={{ title: 'Dashboard', tabBarIcon: ({ focused }) =>
            <Ionicons 
              size={24}
              name={focused ? 'home' : 'home-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          }}
        />
        <Tabs.Screen 
          name="habits" 
          options={{ title: 'Habits', tabBarIcon: ({ focused }) =>
            <Ionicons 
              size={24}
              name={focused ? 'list' : 'list-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{ title: 'Profile', tabBarIcon: ({ focused }) =>
            <Ionicons 
              size={24}
              name={focused ? 'person' : 'person-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          }} 
        />
        <Tabs.Screen 
          name="create" 
          options={{ 
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="edit/[id]"
          options={{
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="change-password"
          options={{
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="profile-stats"
          options={{ href: null }}
        />
      </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout