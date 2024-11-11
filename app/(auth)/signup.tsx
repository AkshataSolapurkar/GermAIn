// src/screens/Signup.tsx
import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { useAuth } from '@/services/context/AuthContext';
import { router } from 'expo-router';

const Signup = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password, name);
      router.push("/(auth)/initial-form")
    } catch (error) {
      console.log('Signup failed', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
  );
};

export default Signup;
