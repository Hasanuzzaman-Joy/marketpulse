import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const googleSign = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const modifiedProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (userCredentials) => {
            setUser(userCredentials)
            setLoading(false);
        })

        return () => {
            subscribe();
        }
    }, [])

    console.log(user)

    const userInfo = {
        googleSign,
        signUp,
        login,
        modifiedProfile,
        logOut,
        user,
        loading,
        setLoading
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;