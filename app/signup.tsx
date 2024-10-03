import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signIn, signUp } from "../service/auth"; // Import the functions

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMode, setAuthMode] = useState("signin");

    const handleAuth = () => {
        if (authMode === "signin") {
            signIn(email, password);
        } else {
            signUp(email, password);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={authMode === "signin" ? "Sign In" : "Sign Up"} onPress={handleAuth} />
            <Button
                title={`Switch to ${authMode === "signin" ? "Sign Up" : "Sign In"}`}
                onPress={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
            />
        </View>
    );
}
