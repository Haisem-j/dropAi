import React, { useContext, useEffect } from "react";
import firebase, {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { AuthProps } from "../interfaces/interface";

export const AuthContext = React.createContext<AuthProps | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const verifyEmail = (user: firebase.User) => {
    return sendEmailVerification(user);
  };
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logout = () => {
    return signOut(auth);
  };
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    verifyEmail,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
