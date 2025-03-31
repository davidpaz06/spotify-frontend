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
      console.error("Registration error:", error);
    }
  };

  const formFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address" as const,
      autoCapitalize: "none" as const,
      required: true,
    },
  ];

  return (
    <SafeAreaView>
      <Text>Hola</Text>

      <Form
        fields={formFields}
        formData={formData || {}}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
        containerStyle={styles.formContainer}
        labelStyle={styles.label}
        inputStyle={styles.input}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        buttonLabel="Continue"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
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
