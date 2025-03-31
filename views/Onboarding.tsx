import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FC, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Form from "../components/Form";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );

  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
    try {
      await handleRegister(formData);
      console.log("Registration successful!");
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
    <SafeAreaView style={styles.container}>
      <Form
        fields={formFields}
        formData={formData || {}}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
        containerStyle={styles.formContainer}
        labelStyle={styles.label}
        inputStyle={styles.input}
        placeholderTextColor="gray"
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        buttonLabel="Continue"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#1c1c1c",
  },

  formContainer: {
    padding: 16,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Onboarding;
