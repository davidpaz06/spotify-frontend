import { FC, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Onboarding from "./views/Onboarding";
import Home from "./views/Home";

export interface RootStackParamList extends ParamListBase {
  Onboarding: undefined;
  Home: undefined;
}

const App: FC = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoggedIn) {
        return;
      }
      // Simulate an API call to check login status
    };

    checkLoginStatus();
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(
    null
  );

  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
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
