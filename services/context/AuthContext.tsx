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

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an active session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Check if user session exists
  const checkSession = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.log('No active session found.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function
// src/context/AuthContext.tsx

const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    setUser(session);
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
      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, Databases, ID, Storage , loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);
