import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Card';
import { COLORS, SHADOWS } from '../../../constants/Theme';
import { useAppContext } from '../../../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const MOODS = [
  { emoji: '😊', label: 'Harika', color: '#4ADE80' },
  { emoji: '🙂', label: 'İyi', color: '#60A5FA' },
  { emoji: '😐', label: 'Normal', color: '#94A3B8' },
  { emoji: '😔', label: 'Üzgün', color: '#F87171' },
  { emoji: '😫', label: 'Yorgun', color: '#FB923C' },
];

export default function HomeScreen() {
  const { posts, currentUser, saveMood } = useAppContext();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const homePosts = posts.filter(p => p.category === 'Home');

  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji);
    saveMood(emoji);
    Alert.alert('Harika!', 'Duygunuz kaydedildi, harikasınız! ✨');
  };

  return (
    <View style={styles.container}>
      <Header title="HealtyApp" />
      <FlatList
        data={homePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            authorName={item.authorName}
            authorAvatar={item.authorAvatar}
            content={item.content}
            image={item.image}
            date={item.date}
            likes={item.likes}
            comments={item.comments}
            views={item.views}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerComponent}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Merhaba, {currentUser?.name || 'Misafir'}</Text>
              <Text style={styles.subText}>Yolculuğunda bugün nasıl hissediyorsun?</Text>
            </View>

            <View style={styles.moodContainer}>
              <Text style={styles.sectionTitle}>Bugün Nasıl Hissediyorsun?</Text>
              <View style={styles.moodRow}>
                {MOODS.map((mood) => (
                  <TouchableOpacity
                    key={mood.emoji}
                    onPress={() => handleMoodSelect(mood.emoji)}
                    activeOpacity={0.7}
                    style={[
                      styles.moodButton,
                      selectedMood === mood.emoji && { borderColor: COLORS.primary, backgroundColor: COLORS.lightGray }
                    ]}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={styles.moodLabel}>{mood.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.quickStatsRow}>
              <LinearGradient
                colors={['#FF69B4', '#FFB6C1']}
                style={styles.statCard}
              >
                <Text style={styles.statLabel}>Günlük Hedef</Text>
                <Text style={styles.statValue}>%85</Text>
              </LinearGradient>
              <LinearGradient
                colors={['#8A4AF3', '#B088F9']}
                style={styles.statCard}
              >
                <Text style={styles.statLabel}>Döngü Günü</Text>
                <Text style={styles.statValue}>14</Text>
              </LinearGradient>
            </View>

            <Text style={[styles.sectionTitle, { marginLeft: 20, marginBottom: 10 }]}>Senin İçin Seçtiklerimiz</Text>
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
    paddingBottom: 40,
  },
  headerComponent: {
    paddingBottom: 10,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 25,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 4,
  },
  moodContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    ...SHADOWS.medium,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 15,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '18%',
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: COLORS.gray,
    fontWeight: '600',
  },
  quickStatsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 20,
    ...SHADOWS.light,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
});
