// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client, Account, ID, Databases, Storage } from 'react-native-appwrite';

// Initialize Appwrite Client
const client = new Client()
.setProject('672f3cb70019ef507e38')
.setPlatform('com.germain.app');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Define a type for the User to ensure user properties are structured
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User ;
  login: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for an active session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Check if user session exists
  const checkSession = async () => {
    try {
      const session = await account.get();
      console.log('Session data:', session); // Verify the session data structure
      
      setUser({
        id: session.$id,
        email: session.email,
        name: session.name,
      });
    } catch (error) {
      console.log('No active session found.', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', session);
      setUser({
        id: session.$id,
        email: session.email,
        name: session.name,
      });
      return session;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Signup function
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      setUser({
        id: newUser.$id,
        email: newUser.email,
        name: newUser.name,
      });
      console.log('Signup successful:', newUser);
      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession('current');
      console.log('User logged out');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
