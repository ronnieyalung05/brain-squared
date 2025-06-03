import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const[session, setSession] = useState(undefined)

    // Sign up
    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error("There was a problem signing up: ", error)
            return {success: false, error}
        }
        return {success: true, data}
    }

    // Sign in
    const signInUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                console.error("Sign in error occurred: ", error);
                return {success: false, error: error.message};
            }
            return {success: true, data}
        } catch(error) {
            console.error("An error occurred: ", error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_even, session) => {
            setSession(session);
        })
    },[])

    // Sign out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if (error) {
            console.error("There was an error: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}