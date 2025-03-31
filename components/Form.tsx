import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  formData: { [key: string]: string };
  setFormData: (data: { [key: string]: string }) => void;
  onSubmit: (formData: { [key: string]: string }) => void;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  buttonStyle?: object;
  buttonTextStyle?: object;
  buttonLabel?: string;
}

const Form: FC<FormProps> = ({
  fields,
  formData,
  setFormData,
  onSubmit,
  containerStyle,
  labelStyle,
  inputStyle,
  buttonStyle,
  buttonTextStyle,
}: FormProps) => {
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        Alert.alert("Validation Error", `${field.label} is required.`);
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, containerStyle]}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fields.map((field) => (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={[styles.label, labelStyle]}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              secureTextEntry={field.secureTextEntry}
              keyboardType={field.keyboardType}
              autoCapitalize={field.autoCapitalize}
              value={field.value}
              onChangeText={(value) => handleChange(field.name, value)}
              style={[styles.input, inputStyle]}
            />
          </View>
        ))}
        <Pressable style={[styles.button, buttonStyle]} onPress={handleSubmit}>
          <Text style={[styles.buttonText, buttonTextStyle]}>Submit</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#f4ce14",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Form;
