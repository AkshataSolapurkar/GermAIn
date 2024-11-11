// src/index.tsx
import React, { useEffect, useState } from 'react';
import { useAuth, AuthProvider } from '@/services/context/AuthContext';
import Login from './(auth)/login';
import Signup from './(auth)/signup';
import Dashboard from './(dashpage)/dashboard';
import { View, Text } from 'react-native';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('Login');

  useEffect(() => {
    // Set screen based on user authentication status
    setCurrentScreen(user ? 'Dashboard' : 'Login');
  }, [user]);

  // Navigate function to switch screens
  const navigate = (screen: string) => setCurrentScreen(screen);

  // Display loading indicator when checking user status
  if (loading) return <Text>Loading...</Text>;

  // Conditionally render screens
  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Login' && <Login navigate={navigate} />}
      {currentScreen === 'Signup' && <Signup navigate={navigate} />}
      {currentScreen === 'Dashboard' && <Dashboard navigate={navigate} />}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
