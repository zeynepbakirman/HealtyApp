import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, ScrollView, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { SYSTEM_TIPS } from '../../constants/mockData';
import { LinearGradient } from 'expo-linear-gradient';

export default function InfoPage() {
  const renderTip = ({ item }: { item: any }) => (
    <View style={styles.tipCard}>
      <View style={[styles.iconContainer, { backgroundColor: '#F5F3FF' }]}>
        <LinearGradient
          colors={['#8A4AF3', '#B088F9']}
          style={styles.iconGradient}
        >
          <Ionicons name={item.icon} size={24} color={COLORS.white} />
        </LinearGradient>
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{item.title}</Text>
        <Text style={styles.tipText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Kısa Bilgiler" showBack />
      <FlatList
        data={SYSTEM_TIPS}
        keyExtractor={(item) => item.id}
        renderItem={renderTip}
        ListHeaderComponent={() => (
          <View style={styles.headerBox}>
            <LinearGradient
              colors={COLORS.gradient}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.headerText}>Uzman Tavsiyeleri</Text>
              <Text style={styles.subText}>Sağlığınız için günlük, pratik ve uzman onaylı ipuçları.</Text>
            </LinearGradient>
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
  headerBox: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  headerGradient: {
    padding: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 8,
  },
  subText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    fontWeight: '500',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 20,
  },
  iconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    fontWeight: '500',
  },
});
