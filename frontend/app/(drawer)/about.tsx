import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Header title="Hakkımızda" showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <LinearGradient colors={COLORS.gradient} style={styles.bannerGradient}>
            <Image source={{ uri: 'https://img.icons8.com/color/96/lotus.png' }} style={styles.logo} />
            <Text style={styles.bannerTitle}>HealtyApp</Text>
            <Text style={styles.bannerSub}>Kadın Sağlığı ve Doğurganlık Rehberi</Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Vizyonumuz</Text>
          </View>
          <Text style={styles.sectionText}>
            Kadınların kendi bedenlerini daha iyi tanımasını sağlayarak, anne olma yolculuğunda onlara en doğru, bilimsel ve güvenilir rehberliği sunmaktır.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="rocket-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Misyonumuz</Text>
          </View>
          <Text style={styles.sectionText}>
            Teknoloji ve uzman bilgisini birleştirerek; kişiselleştirilmiş beslenme, stres yönetimi ve döngü takibi süreçlerini herkes için erişilebilir kılmak.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Ekibimiz</Text>
          </View>
          <Text style={styles.sectionText}>
            Platformumuz; jinekologlar, beslenme uzmanları, psikologlar ve yazılım geliştiricilerden oluşan multidisipliner bir ekip tarafından sürekli geliştirilmektedir.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 HealtyApp. Tüm Hakları Saklıdır.</Text>
          <Text style={styles.versionText}>Versiyon 2.4.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  bannerContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  bannerGradient: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 5,
  },
  bannerSub: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 4,
  },
});
