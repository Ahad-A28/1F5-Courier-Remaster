import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authData = useProvideAuth();
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track auth state loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ id: user.uid, email: user.email }); // Keep user data in state
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { user, isLoading, login, logout };
}
