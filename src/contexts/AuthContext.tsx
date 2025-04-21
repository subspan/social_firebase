import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      // Map Firebase error codes to user-friendly messages
      let errorMessage = "Failed to create account. Please try again.";
      
      if (authError.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use. Please try signing in or use a different email.";
      } else if (authError.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (authError.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (authError.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
      }
      
      setError(errorMessage);
      console.error('Error signing up:', authError);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      // Map Firebase error codes to user-friendly messages
      let errorMessage = "Failed to sign in. Please try again.";
      
      if (authError.code === 'auth/invalid-credential' || 
          authError.code === 'auth/invalid-email' || 
          authError.code === 'auth/user-not-found' || 
          authError.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (authError.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled. Please contact support.";
      } else if (authError.code === 'auth/too-many-requests') {
        errorMessage = "Too many unsuccessful login attempts. Please try again later or reset your password.";
      }
      
      setError(errorMessage);
      console.error('Error signing in:', authError);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
      console.error('Error signing out:', authError);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};