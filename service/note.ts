import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

const apiUrl = "https://noteapp-be-klgw.onrender.com"

export const createNote = async (title: string, content: string) => {
    try {
        const userId = await AsyncStorage.getItem("userId")
        if(!userId) {
            Alert.alert("Please sign in to create a note")
            router.replace("/signup")
            return
        }
        const response = await axios.post(`${apiUrl}/note`, { userId: userId, title: title, content: content })
        console.log(response.data, "This is the created note")
        return response.data
    } catch (error: any) {
        console.error('Error creating note:', error);
        Alert.alert(error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "Error creating note")
    }
}

export const fetchNotes = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId")
        if(!userId) {
            Alert.alert("Please sign in to create a note")
            router.replace("/signup")
            return
        }
        const response = await axios.get(`${apiUrl}/note?userId=${userId}`)
        console.log(response.data, "This are the notes fetched")
        return response.data
    } catch (error: any) {
        console.error('Error creating note:', error);
        Alert.alert(error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "Error creating note")
    }
}