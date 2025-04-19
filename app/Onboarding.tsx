import { StyleSheet, Text, Pressable, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
      // console.error("Onboarding - Registration error:", error);
    }
  };

  const formFields = [
    {
      name: "username",
      placeholder: "Enter your username",
      autoCapitalize: "none" as const,
      required: true,
    },
    {
      name: "password",
      placeholder: "Enter your password",
      secureTextEntry: true,
      autoCapitalize: "none" as const,
      required: true,
    },
  ];

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardOpeningTime={0}
    >
      <Image
        source={require("../assets/images/onboarding-logo.png")}
        style={{
          alignSelf: "center",
        }}
      />
      <Form
        fields={formFields}
        formData={formData || {}}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
        containerStyle={styles.formContainer}
        inputStyle={styles.input}
        placeholderTextColor="#fff"
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        buttonLabel={isRegistering[0] ? "Register" : "Login"}
      />
      <Pressable
        style={styles.redirectButton}
        onPress={() =>
          setIsRegistering([
            !isRegistering[0],
            isRegistering[1] === "Register" ? "Login" : "Register",
          ])
        }
      >
        <Text style={styles.redirectText}>
          {isRegistering[0]
            ? "Already have an account? Log in"
            : "First time here? Sign up"}
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    padding: 20,
  },

  formContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    color: "#fff",
    width: "80%",
    alignSelf: "center",
  },

  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: "60%",
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  redirectButton: {
    position: "absolute",
    bottom: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  redirectText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default Onboarding;
