import { FC, useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos
import { AuthProvider } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/Onboarding";
import Home from "./app/Home";
import HomeBackup from "./app/HomeBackup";

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
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: "home-outline" | "settings-outline" =
                  "home-outline";

                if (route.name === "Home") {
                  iconName = "home-outline";
                } else if (route.name === "HomeBackup") {
                  iconName = "settings-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#1DB954", // Color del ícono activo
              tabBarInactiveTintColor: "#909090", // Color del ícono inactivo
              tabBarStyle: {
                backgroundColor: "#1A1A1A", // Color de fondo del tabBar
              },
            })}
          >
            <Tab.Screen name="Home" options={{ headerShown: false }}>
              {() => <Home setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen name="HomeBackup" options={{ headerShown: false }}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
