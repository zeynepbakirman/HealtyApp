import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Header } from '../../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Theme';

export default function ContactScreen() {
  const contactMethods = [
    { id: '1', title: 'Bizi Arayın', icon: 'call-outline', value: '+90 555 555 55 55' },
    { id: '2', title: 'E-posta Gönderin', icon: 'mail-outline', value: 'info@hifertility.com' },
    { id: '3', title: 'WhatsApp', icon: 'logo-whatsapp', value: '+90 555 555 55 56' },
    { id: '4', title: 'Web Sitemiz', icon: 'globe-outline', value: 'www.hifertility.com' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="İletişim" />
      <View style={styles.content}>
        <Text style={styles.title}>Bizimle İletişime Geçin</Text>
        <Text style={styles.subtitle}>Her türlü soru ve görüşleriniz için buradayız.</Text>

        <View style={styles.methodsContainer}>
          {contactMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.methodCard}>
              <View style={styles.iconContainer}>
                <Ionicons name={method.icon as any} size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodValue}>{method.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  methodsContainer: {
    width: '100%',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  methodValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
});
