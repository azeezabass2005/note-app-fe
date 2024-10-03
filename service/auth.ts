import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import axios from 'axios'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiUrl = "https://noteapp-be-klgw.onrender.com"

export const signUp = async (email: string, password: string, name: string) => {
    try {
        console.log("Signup called from here")
        if(email && password) {
            const firebaseUser = await createUserWithEmailAndPassword(auth, email, password)
            console.log(firebaseUser?.user, "This is the newly created firebase user")
            if(!firebaseUser?.user?.uid) {
                return
            }
            const response = await axios.post(`${apiUrl}/profile`,
                {
                    name,
                    email,
                    userId: firebaseUser?.user?.uid,
                }
            )
            console.log(response.data)
            if(response.data.success === false) {
                Alert.alert(response.data.message)
            } else {
                Alert.alert(response.data.message)
                AsyncStorage.setItem("userId", firebaseUser?.user?.uid)
                AsyncStorage.setItem("name", response.data.payload.name)
                router.replace("/notes")
            }
            console.log(response.data?.payload, "This is the newly created user")
        }

        
    } catch (error: any) {
        console.log(error, "This is the error doing registration")
        Alert.alert(error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "User Registration Failed")
        return {
            response: {
                success: false,
                message: error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "User Registration Failed",
            }
        }
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        if(email && password) {
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password)
            console.log(firebaseUser, "This is the user that signed in firebase user")
            const response = await axios.get(`/profile?userId=${firebaseUser.user.uid}`)
            if(response.data.success === false) {
                Alert.alert(response.data.message)
            } else {
                Alert.alert(response.data.message)
                AsyncStorage.setItem("userId", firebaseUser?.user?.uid)
                AsyncStorage.setItem("userId", response.data.payload.name)
                router.replace("/notes")
            }
            
        }
        
    } catch (error: any) {
        console.log(error, "This is the error doing login")
        Alert.alert(error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "Login Failed")
        return {
            response: {
                success: false,
                message: error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "Login Failed",
            }
        }
    }
}


export const logout = async () => {
    try {
        await signOut(auth);

        await AsyncStorage.removeItem("userId");

        router.replace("/signup");

        Alert.alert("You have been logged out.");
    } catch (error: any) {
        console.log(error, "Error during logout");
        Alert.alert(
            error?.message ||
            "Logout failed, please try again."
        );
    }
};