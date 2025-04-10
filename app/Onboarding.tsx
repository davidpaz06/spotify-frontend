import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { FC, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import Form from "../components/Form";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  const [isRegistering, setIsRegistering] = useState<[boolean, string]>([
    false,
    "Login",
  ]);
  const { handleLogin } = useAuth();
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );

  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
    try {
      if (isRegistering[0]) {
        await handleRegister(formData);
      } else if (!isRegistering[0]) {
        await handleLogin(formData.username, formData.password);
      }
      onComplete();
    } catch (error) {
      console.error("Onboarding - Registration error:", error);
    }
  };

  const formFields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      autoCapitalize: "none" as const,
      required: true,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      secureTextEntry: true,
      autoCapitalize: "none" as const,
      required: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/onboarding-logo.png")}
        style={{ alignSelf: "center" }}
      />
      <Form
        fields={formFields}
        formData={formData || {}}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
        labelStyle={styles.label}
        inputStyle={styles.input}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        buttonLabel={isRegistering[0] ? "Register" : "Login"}
      />
      <Text style={styles.label}>{isRegistering[1]} </Text>
      <Pressable
        onPress={() =>
          setIsRegistering([
            !isRegistering[0],
            isRegistering[1] === "Register" ? "Login" : "Register",
          ])
        }
        style={styles.button}
      >
        <Text style={styles.redirect}>
          {isRegistering[0]
            ? "Already have an account? Log in"
            : "First time here? Sign up"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161616",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },
  label: {
    display: "none",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "#fff",
  },
  placeholder: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  redirect: {
    position: "absolute",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    bottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Onboarding;
