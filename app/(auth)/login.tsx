// src/screens/Login.tsx
import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/services/context/AuthContext';
import { Link, useRouter } from 'expo-router';

const Login = ({ navigation }: any) => {
  const router = useRouter()
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(dashpage)/dashboard")
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />

      <Link href={'/(auth)/signup'}>
      <Text style={styles.signupText}>
        Don't have an account? Sign up
      </Text>
      </Link>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    padding: 16,
    backgroundColor: '#f5f5f5', // Optional background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32, // Space between header and inputs
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  signupText: {
    marginTop: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default Login;
