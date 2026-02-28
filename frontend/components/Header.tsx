import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { COLORS } from '../constants/Theme';
import { useAppContext } from './AppContext';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onMenuPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, onMenuPress }) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();
  const { unreadCount } = useAppContext();

  const handleLeftPress = () => {
    if (onBack) {
      onBack();
    } else if (onMenuPress) {
      onMenuPress();
    } else if (showBack) {
      router.back();
    } else {
      navigation.openDrawer();
    }
  };

  return (
    <LinearGradient
      colors={COLORS.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={handleLeftPress}
        activeOpacity={0.7}
        style={styles.iconButton}
      >
        <Ionicons
          name={showBack ? 'arrow-back' : 'menu'}
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={() => router.push('/(drawer)/notifications')}
      >
        <Ionicons name="notifications" size={24} color={COLORS.white} />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  badge: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
