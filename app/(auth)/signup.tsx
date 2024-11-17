import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/services/context/AuthContext';
import { Link, router } from 'expo-router';

const Signup = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password, name);
      router.push("/(auth)/initial-form");
    } catch (error) {
      console.log('Signup failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/loginimage.png')} 
        style={styles.decorativeImage}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Join</Text>
        <Text style={styles.brandText}>GermAIn</Text>
        <Text style={styles.subtitleText}>
          Start your journey to better Nitrition with AI
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <Link href={'/(auth)/login'} style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Sign in</Text>
          </Text>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  decorativeImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 200,
    height: 200,
    transform: [{ rotate: '270deg' }],
    opacity: 0.7,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
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
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f5f8ff',
    borderRadius: 7,
    padding: 10,
    marginBottom: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  signupButton: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    alignItems: "center",
    textAlign :"center",
    color: '#0066FF',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Signup;