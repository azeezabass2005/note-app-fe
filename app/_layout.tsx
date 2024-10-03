import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Initially, we don't know the login status

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId"); // Check if userId is stored
                if (userId) {
                    setIsLoggedIn(true); // User is logged in
                } else {
                    setIsLoggedIn(false); // User is not logged in
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
        };

        if (loaded) {
            checkLoginStatus();
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded || isLoggedIn === null) {
        return null; // Show nothing until fonts are loaded and login status is determined
    }

    return (
        <Stack>
            {isLoggedIn ? (
                <Stack.Screen name="notes" options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="signup" options={{ headerShown: false }} />
            )}
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
