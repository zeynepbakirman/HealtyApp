import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { EXPERTS } from '../../constants/mockData';
import { LinearGradient } from 'expo-linear-gradient';

export default function CounselingScreen() {
  const handleBook = (expertName: string) => {
    Alert.alert(
      'Randevu Onayı',
      `${expertName} ile randevu talebiniz alındı. En kısa sürede sizinle iletişime geçilecektir. ✨`,
      [{ text: 'Tamam' }]
    );
  };

  const renderExpertCard = ({ item }: { item: any }) => (
    <View style={styles.expertCard}>
      <View style={styles.expertImageContainer}>
        <Image source={{ uri: item.image }} style={styles.expertImage} />
        <View style={styles.onlineBadge} />
      </View>
      <View style={styles.expertInfo}>
        <Text style={styles.expertName}>{item.name}</Text>
        <Text style={styles.expertTitle}>{item.title}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.dot} />
          <Text style={styles.experienceText}>10+ Yıl Deneyim</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bookButton}
          onPress={() => handleBook(item.name)}
        >
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookGradient}
          >
            <Text style={styles.bookButtonText}>Randevu Al</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Danışmanlık" showBack />
      <FlatList
        data={EXPERTS}
        keyExtractor={(item) => item.id}
        renderItem={renderExpertCard}
        ListHeaderComponent={() => (
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Uzmanlarımız</Text>
            <Text style={styles.headerSub}>Size en uygun uzmanı seçin ve yolculuğunuzda profesyonel destek alın.</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerSub: {
    fontSize: 15,
    color: COLORS.gray,
    lineHeight: 22,
    fontWeight: '500',
  },
  expertCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  expertImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  expertImage: {
    width: 90,
    height: 110,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  expertInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  expertName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 4,
  },
  expertTitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '800',
    marginLeft: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  experienceText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },
  bookButton: {
    ...SHADOWS.light,
  },
  bookGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
