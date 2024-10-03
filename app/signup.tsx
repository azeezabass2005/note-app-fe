import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { signIn, signUp } from "../service/auth";

const CustomButton = ({ title, onPress, primary }: any) => (
  <TouchableOpacity
    style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, primary ? styles.primaryButtonText : styles.secondaryButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("signin");

  const handleAuth = () => {
    if (authMode === "signin") {
        console.log("Sign in function clicked")
      signIn(email, password);
    } else {
      signUp(email, password, name);
      console.log("Signup button clicked")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{authMode === "signin" ? "Sign In" : "Sign Up"}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />
      </View>
      {authMode === "signup" &&
        (
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                />
            </View>
        )
      }
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
        />
      </View>
      <CustomButton
        title={authMode === "signin" ? "Sign In" : "Sign Up"}
        onPress={handleAuth}
        primary
      />
      <CustomButton
        title={`Switch to ${authMode === "signin" ? "Sign Up" : "Sign In"}`}
        onPress={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButtonText: {
    color: "#ffffff",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
});