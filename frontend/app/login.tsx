import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SHADOWS } from '../constants/Theme';
import { useAppContext } from '../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser, allUsers } = useAppContext();

  const handleLogin = () => {
    const user = allUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      router.replace('/(drawer)/(tabs)');
    } else {
      Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F3E8FF']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={COLORS.gradient}
                  style={styles.logoGradient}
                >
                  <Ionicons name="heart" size={40} color={COLORS.white} />
                </LinearGradient>
              </View>
              <Text style={styles.title}>HealtyApp</Text>
              <Text style={styles.subtitle}>Kadın Sağlığı ve Doğurganlık Rehberi</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Kullanıcı Adı</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Kullanıcı adınızı girin"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Şifre</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={handleLogin}>
                <LinearGradient
                  colors={COLORS.gradient}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginButtonText}>Giriş Yap</Text>
                  <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Kişisel verileriniz KVKK kapsamında korunmaktadır.</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    ...SHADOWS.medium,
    backgroundColor: COLORS.white,
    padding: 5,
    marginBottom: 20,
  },
  logoGradient: {
    flex: 1,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
  form: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 30,
    ...SHADOWS.medium,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: COLORS.dark,
  },
  loginButton: {
    marginTop: 10,
    ...SHADOWS.light,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 18,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
