import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Header } from '../../../components/Header';
import { LessonItem } from '../../../components/LessonItem';
import { COLORS, SHADOWS } from '../../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LESSONS_DATA = [
  {
    id: '1',
    title: 'Doğurganlık Temelleri',
    category: 'Eğitim Serisi',
    banner: 'https://tse4.mm.bing.net/th/id/OIP.9EcZ43JT35ac9fdSgr5OTQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    videos: [
      { id: 'v1', title: 'Hormonal Döngü Nedir?', duration: '12:45', url: 'https://youtu.be/LuejlcqIr3Q?si=-c02CXg7PEUsDf2t' },
      { id: 'v2', title: 'Ovülasyon Takibi Nasıl Yapılır?', duration: '08:20', url: 'https://youtu.be/GriRydmtnG0?si=g7s5pLLmhVGrv7Ui' }

    ]
  },
  {
    id: '2',
    title: 'Yoga ve Rahatlama',
    category: 'Pratik Seri',
    banner: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    videos: [
      { id: 'v4', title: 'Sabah Yogası (15 dk)', duration: '15:00', url: 'https://youtu.be/m970B6ZNL3s?si=WxMwsxReZRT0Hjlp' },
      { id: 'v5', title: 'Derin Gevşeme Tekniği', duration: '10:30', url: 'https://youtu.be/PfRqmzmmaxI?si=3jKdzUEaqxcx8vO6' }
    ]
  }
];

export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Eğitimler" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {LESSONS_DATA.map((lesson) => (
          <View key={lesson.id} style={styles.categorySection}>
            <View style={styles.lessonHeader}>
              <Image source={{ uri: lesson.banner }} style={styles.lessonBanner} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.bannerOverlay}
              >
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{lesson.category}</Text>
                </View>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="play-circle" size={16} color={COLORS.white} />
                  <Text style={styles.infoText}>{lesson.videos.length} Video</Text>
                  <View style={styles.dot} />
                  <Ionicons name="time" size={16} color={COLORS.white} />
                  <Text style={styles.infoText}>45 dk Toplam</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.videoList}>
              {lesson.videos.map((video, index) => (
                <LessonItem
                  key={video.id}
                  index={index + 1}
                  title={video.title}
                  duration={video.duration}
                  url={video.url}
                />
              ))}
            </View>
          </View>
        ))}
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
    paddingBottom: 40,
  },
  categorySection: {
    marginBottom: 10,
  },
  lessonHeader: {
    width: '100%',
    height: 240,
    position: 'relative',
    overflow: 'hidden',
  },
  lessonBanner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    height: '60%',
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.white,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 12,
  },
  videoList: {
    padding: 20,
    paddingTop: 10,
  },
});
