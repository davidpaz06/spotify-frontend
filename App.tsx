import { FC, useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
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
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
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
              tabBarActiveTintColor: "#1DB954",
              tabBarInactiveTintColor: "#909090",
              tabBarStyle: {
                backgroundColor: "#1A1A1A",
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
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
