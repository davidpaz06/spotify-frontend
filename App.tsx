import { FC, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./app/Onboarding";
import Home from "./app/Home";

export interface RootStackParamList extends ParamListBase {
  Onboarding: undefined;
  Home: undefined;
}

const App: FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(
    null
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
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
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {() => <Home setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Onboarding
            onComplete={() => {
              setIsLoggedIn(true);
            }}
          />
        )}

        <StatusBar style="auto" />
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
