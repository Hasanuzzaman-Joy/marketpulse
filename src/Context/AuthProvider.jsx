import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import useAxios from '../hooks/useAxios';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const axiosInstance = useAxios();

    const googleSign = () => {
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
        localStorage.removeItem("token");
        return signOut(auth);
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, async (userCredentials) => {
            setUser(userCredentials);
            if (userCredentials) {
                const res = await axiosInstance.post("/jwt", { email: userCredentials.email });
                localStorage.setItem("token", res.data.token);
            } else {
                localStorage.removeItem("token");
            }
            setLoading(false);
        })

        return () => {
            subscribe();
        }
    }, [axiosInstance])

    const userInfo = {
        googleSign,
        signUp,
        login,
        modifiedProfile,
        logOut,
        user,
        setUser,
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