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
// import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RootStackParamList extends ParamListBase {
  Onboarding: undefined;
  Home: undefined;
}

const App: FC = () => {
  const { user } = useAuth();
  const Stack = createStackNavigator<RootStackParamList>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(
    null
  );

  useEffect(() => {
    const checkOnboardingStatus = async () => {};
    checkOnboardingStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={(props: any) => (
            <Onboarding {...props} onComplete={setIsLoggedIn(true)} />
          )}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
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
