import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/Theme';
import { useRouter } from 'expo-router';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAppContext } from './AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const MENU_ITEMS = [
  { id: '/(drawer)/(tabs)', title: 'Ana Sayfa', icon: 'home-outline' },
  { id: '/(drawer)/notifications', title: 'Bildirimler', icon: 'notifications-outline' },
  { id: '/(drawer)/homework', title: 'Ev Ödevi', icon: 'book-outline' },
  { id: '/(drawer)/counseling', title: 'Danışmanlık', icon: 'people-outline' },
  { id: '/(drawer)/roadmap', title: 'Yol Haritası', icon: 'map-outline' },
  { id: '/(drawer)/lessons', title: 'Eğitimler', icon: 'play-circle-outline' },
  { id: '/(drawer)/(tabs)/blog', title: 'Blog', icon: 'newspaper-outline' },
  { id: '/(drawer)/survey', title: 'Anketler', icon: 'stats-chart-outline' },
  { id: '/(drawer)/(tabs)/forum', title: 'Forum', icon: 'chatbubbles-outline' },
  { id: '/(drawer)/info-page', title: 'Kısa Bilgiler', icon: 'bulb-outline' },
  { id: '/(drawer)/about', title: 'Hakkımızda', icon: 'information-circle-outline' },
  { id: '/(drawer)/consent', title: 'Onam Formu', icon: 'document-text-outline' },
];

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { currentUser, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradient} style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.profileSection}
          onPress={() => {
            router.push('/(drawer)/profile');
            props.navigation.closeDrawer();
          }}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUser?.name || 'Giriş Yapılmadı'}</Text>
            <Text style={styles.userEmail}>{currentUser?.email || ''}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuContent}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.6}
            onPress={() => {
              router.push(item.id as any);
              props.navigation.closeDrawer();
            }}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.6}
          onPress={handleLogout}
        >
          <View style={styles.logoutIconBox}>
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </View>
          <Text style={styles.logoutTitle}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    padding: 2,
    backgroundColor: 'transparent',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
  userEmail: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 2,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 15,
    color: COLORS.dark,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 15,
  },
  logoutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoutTitle: {
    fontSize: 15,
    color: '#EF4444',
    fontWeight: '700',
  },
});
