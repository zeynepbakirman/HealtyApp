import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { useAppContext } from '../../components/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const { currentUser, logout } = useAppContext();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Header title="Profil" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <LinearGradient colors={COLORS.gradient} style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.email}>{currentUser.email}</Text>

            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Ionicons name="shield-checkmark" size={14} color={COLORS.white} />
                <Text style={styles.badgeText}>Premium Üye</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Gönderi</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Beğeni</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Yorum</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkımda</Text>
          <View style={styles.bioCard}>
            <Text style={styles.bioText}>{currentUser.bio || 'Henüz bir biyografi eklenmemiş.'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Kullanıcı Adı</Text>
                <Text style={styles.infoValue}>@{currentUser.username}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Katılım Tarihi</Text>
                <Text style={styles.infoValue}>Ocak 2026</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#FEF2F2', '#FEE2E2']}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out" size={22} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Güvenli Çıkış Yap</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    overflow: 'hidden',
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    padding: 3,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 12,
    marginLeft: 4,
  },
  bioCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  bioText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '700',
  },
  logoutButton: {
    ...SHADOWS.light,
    marginBottom: 20,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
  },
  spacer: {
    height: 40,
  },
});
