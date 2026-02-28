import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

interface LessonItemProps {
  index: number;
  title: string;
  duration: string;
  url?: string;
}

export const LessonItem: React.FC<LessonItemProps> = ({ index, title, duration, url }) => {
  const handlePress = async () => {
    if (url) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Hata', 'Bu video şu an açılamıyor.');
        }
      } catch (error) {
        // Fallback for some links
        Linking.openURL(url);
      }
    } else {
      Alert.alert('Yakında', 'Bu eğitim içeriği çok yakında eklenecektir.');
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <LinearGradient
          colors={COLORS.gradient}
          style={styles.indexCircle}
        >
          <Text style={styles.indexText}>{index}</Text>
        </LinearGradient>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.durationRow}>
            <Ionicons name="time-outline" size={12} color={COLORS.gray} />
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>
      </View>
      <View style={styles.playButton}>
        <Ionicons name="play" size={16} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 12,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indexCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  indexText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
    fontWeight: '600',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
