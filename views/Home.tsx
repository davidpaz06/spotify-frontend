import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <View style={styles.content}>
        <Text>This is where the main content will go.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
});

export default Home;
