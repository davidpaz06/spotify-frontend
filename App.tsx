import { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/Onboarding";
import Home from "./app/Home";
import HomeBackup from "./app/HomeBackup";
import Search from "./app/Search";
import Profile from "./app/Profile";

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen: FC<{ setIsLoggedIn: (value: boolean) => void }> = ({
  setIsLoggedIn,
}) => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home">
      {() => <Home setIsLoggedIn={setIsLoggedIn} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="Profile">
      {() => <Profile setIsLoggedIn={setIsLoggedIn} />}
    </HomeStack.Screen>
  </HomeStack.Navigator>
);

const SearchStackScreen: FC<{ setIsLoggedIn: (value: boolean) => void }> = ({
  setIsLoggedIn,
}) => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen name="Search">
      {() => <Search setIsLoggedIn={setIsLoggedIn} />}
    </SearchStack.Screen>
    <HomeStack.Screen name="Profile">
      {() => <Profile setIsLoggedIn={setIsLoggedIn} />}
    </HomeStack.Screen>
  </SearchStack.Navigator>
);

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
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "#FFFFFF",
              tabBarInactiveTintColor: "#909090",
              tabBarStyle: {
                backgroundColor: "#1A1A1A",
                borderColor: "#1A1A1A",
                elevation: 10,
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
              {() => <SearchStackScreen setIsLoggedIn={setIsLoggedIn} />}
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
              {() => <HomeStackScreen setIsLoggedIn={setIsLoggedIn} />}
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
