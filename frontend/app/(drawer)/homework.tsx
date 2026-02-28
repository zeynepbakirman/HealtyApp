import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { useAppContext } from '../../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeworkScreen() {
  const { likePost, currentUser } = useAppContext();

  const homeworkData = [
    {
      id: 'hw1',
      authorName: 'Hifertility',
      authorAvatar: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&auto=format&fit=crop',
      date: '28 Şub 13:51',
      title: 'Beslenme Alışveriş Listenizi Hazırlayın',
      content: 'Aylık alışveriş listenizi bu sefer doğurganlığı arttırıcı besinleri (avokado, ceviz, kuşkonmaz, yumurta) göz önünde bulundurarak hazırlayın.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000',
      likes: ['1', '2', '3', '4'],
      comments: 3,
      views: 128,
    },
    {
      id: 'hw2',
      authorName: 'Hifertility',
      authorAvatar: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&auto=format&fit=crop',
      date: '27 Şub 10:20',
      title: 'Günlük Su Takibi',
      content: 'Bugün kaç bardak su içtiniz? Hedefimiz en az 8 bardak. Listenize işaretlemeyi unutmayın.',
      image: 'https://www.menemenhaber.com.tr/images/haberler/2023/12/bakanlik-acikladi-en-kaliteli-icme-suyu-markalari-onlar-secildi-bunlari-ise-agziniza-bile-surmeyin-226974362.jpg',
      likes: ['1', '5'],
      comments: 1,
      views: 245,
    }
  ];

  const renderHomeworkCard = ({ item }: { item: any }) => {
    const isLiked = currentUser ? item.likes.includes(currentUser.id) : false;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.authorInfo}>
            <View style={styles.logoContainer}>
              <LinearGradient colors={COLORS.gradient} style={styles.logoGradient}>
                <Ionicons name="heart" size={20} color={COLORS.white} />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.authorName}>{item.authorName}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardContent}>{item.content}</Text>
          <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={14} color="#FF3B30" />
              <Text style={styles.statsText}>{item.likes.length}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={12} color={COLORS.gray} />
              <Text style={styles.statsText}>{item.comments}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color={COLORS.gray} />
              <Text style={styles.statsText}>{item.views}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => likePost(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color={isLiked ? "#FF3B30" : COLORS.gray} />
              <Text style={[styles.actionText, isLiked && { color: "#FF3B30" }]}>Beğen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => { }}
              activeOpacity={0.7}
            >
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.gray} />
              <Text style={styles.actionText}>Yorum</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => { }}
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={22} color={COLORS.gray} />
              <Text style={styles.actionText}>Paylaş</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Ev Ödevi" showBack />
      <FlatList
        data={homeworkData}
        keyExtractor={(item) => item.id}
        renderItem={renderHomeworkCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.introBox}>
            <Text style={styles.introTitle}>Haftalık Görevleriniz</Text>
            <Text style={styles.introSub}>Sürecinizi hızlandıracak özel aktiviteleri burada bulabilirsiniz.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  introBox: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  introSub: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginBottom: 24,
    ...SHADOWS.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    ...SHADOWS.light,
  },
  logoGradient: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    fontWeight: '800',
    fontSize: 16,
    color: COLORS.dark,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '500',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 10,
    lineHeight: 28,
  },
  cardContent: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '500',
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
  cardFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statsText: {
    fontSize: 13,
    color: COLORS.gray,
    marginLeft: 5,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginHorizontal: 4,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray,
  },
});
