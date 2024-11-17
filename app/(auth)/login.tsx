import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/services/context/AuthContext';
import { Link, useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(dashpage)/dashboard");
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandText}>GermAIn</Text>
        <Text style={styles.subtitleText}>
          AI Nutritionist! We believe nutrition is in the diet.
          So a diet plan for all your nutrition needs.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Link href={'/(auth)/signup'} style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </Link>
      </View>

      {/* Image is outside the container but still on the screen */}
      <Image
        source={require('../../assets/images/loginimage.png')} // Replace 'your-image.png' with the actual file name
        style={styles.bottomRightImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    maxWidth: '80%',
  },
  formContainer: {
    padding: 24,

  },
  input: {
    backgroundColor: '#f5f8ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  loginButton: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    color: '#0066FF',
    fontWeight: '600',
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: 10,
    right: 0,  
    width: 200, 
    height: 200, 
  },
});

export default Login;
