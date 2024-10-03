import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

export const signUp = async (email: string, password: string) => {
    try {
        if(email && password) {
            const firebaseUser = await createUserWithEmailAndPassword(auth, email, password)
            console.log(firebaseUser, "This is the newly created firebase user")
        }
    } catch (error: any) {
        console.log(error, "This is the error doing registration")
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
        }
    } catch (error: any) {
        console.log(error)
        return {
            response: {
                success: false,
                message: error?.message || error?.response?.data?.message || error?.response?.message || error?.data?.message || error?.msg || error?.details || "User Registration Failed",
            }
        }
    }
}