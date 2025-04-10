import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";
import Background from "./Background";
import StatusBar from "./StatusBar";

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
  placeholderTextColor?: string;
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
  placeholderTextColor,
  buttonStyle,
  buttonTextStyle,
  buttonLabel = "Submit",
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
    <>
      <StatusBar backgroundColor="#1A1A1A" />
      <View style={styles.formContainer}>
        {fields.map((field) => (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={[styles.label, labelStyle]}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              placeholderTextColor={placeholderTextColor}
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
          <Text style={[styles.buttonText, buttonTextStyle]}>
            {buttonLabel}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "transparent",
  },
  fieldContainer: {},
  label: {
    fontSize: 16,
  },
  input: {
    height: 40,
  },
  button: {},
  buttonText: {
    fontSize: 16,
  },
});

export default Form;
