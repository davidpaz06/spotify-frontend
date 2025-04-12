import { FC, useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/Onboarding";
import Home from "./app/Home";
import HomeBackup from "./app/HomeBackup";
import Search from "./app/Search";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Tab = createBottomTabNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "#FFFFFF", // Color del ícono activo
              tabBarInactiveTintColor: "#909090", // Color del ícono inactivo
              tabBarStyle: {
                backgroundColor: "#1A1A1A", // Color de fondo del tabBar
                borderColor: "#1A1A1A", // Color del borde del tabBar
                elevation: 10, // Sombra para Android
              },
            })}
          >
            <Tab.Screen
              name="Search"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? "search" : "search-outline"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            >
              {() => <Search setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen
              name="Home"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            >
              {() => <Home setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen
              name="My playlists"
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? "library" : "library-outline"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            >
              {() => <HomeBackup setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Onboarding
            onComplete={() => {
              setIsLoggedIn(true);
            }}
          />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
