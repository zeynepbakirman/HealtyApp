import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal, ScrollView, Image, Platform } from 'react-native';
import { Header } from '../../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../../../constants/Theme';
import { useAppContext } from '../../../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForumScreen() {
  const router = useRouter();
  const { forumTopics } = useAppContext();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const renderTopic = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => setSelectedTopic(item)}
      activeOpacity={0.7}
    >
      <View style={styles.topicHeader}>
        <View style={styles.topicTitleRow}>
          <Text style={styles.topicTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.repliesBadge}>
            <Text style={styles.repliesCount}>{item.replies || 0}</Text>
          </View>
        </View>
      </View>
      <View style={styles.topicFooter}>
        <View style={styles.authorRow}>
          <Image source={{ uri: item.authorAvatar }} style={styles.authorAvatar} />
          <Text style={styles.topicInfo}>{item.authorName}</Text>
        </View>
        <Text style={styles.topicDate}>
          {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Forum" />
      <View style={styles.topActions}>
        <View>
          <Text style={styles.sectionTitle}>Mesaj Kutusu</Text>
          <Text style={styles.sectionSub}>{forumTopics.length} aktif tartışma</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.newTopicButton}
          onPress={() => router.push('/(drawer)/forum/new-topic')}
        >
          <LinearGradient
            colors={COLORS.gradient}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="add" size={20} color={COLORS.white} />
            <Text style={styles.newTopicText}>Yeni Konu</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <FlatList
        data={forumTopics}
        keyExtractor={(item) => item.id}
        renderItem={renderTopic}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedTopic}
        animationType="slide"
        onRequestClose={() => setSelectedTopic(null)}
      >
        <View style={styles.modalContainer}>
          <Header
            title="Konu Detayı"
            showBack
            onBack={() => setSelectedTopic(null)}
          />
          {selectedTopic && (
            <ScrollView contentContainerStyle={styles.topicDetailContent} showsVerticalScrollIndicator={false}>
              <View style={styles.detailCard}>
                <View style={styles.topicDetailHeader}>
                  <Image source={{ uri: selectedTopic.authorAvatar }} style={styles.detailAvatar} />
                  <View>
                    <Text style={styles.detailAuthor}>{selectedTopic.authorName}</Text>
                    <Text style={styles.detailDate}>{new Date(selectedTopic.date).toLocaleString('tr-TR')}</Text>
                  </View>
                </View>

                <Text style={styles.detailTitle}>{selectedTopic.title}</Text>
                <Text style={styles.detailContent}>{selectedTopic.content}</Text>

                {selectedTopic.image && (
                  <Image source={{ uri: selectedTopic.image }} style={styles.detailImage} resizeMode="cover" />
                )}
              </View>

              <View style={styles.commentSection}>
                <Text style={styles.commentsTitle}>Yanıtlar ({selectedTopic.comments?.length || 0})</Text>

                {selectedTopic.comments?.map((comment: any) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <Image source={{ uri: `https://ui-avatars.com/api/?name=${comment.userName}&background=random` }} style={styles.commentAvatar} />
                      <Text style={styles.commentAuthor}>{comment.userName}</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                ))}

                {(!selectedTopic.comments || selectedTopic.comments.length === 0) && (
                  <Text style={styles.noComments}>Henüz yanıt verilmemiş. İlk yanıtlayan sen ol!</Text>
                )}
              </View>
            </ScrollView>
          )}
          <View style={styles.replyBar}>
            <TouchableOpacity style={styles.replyInput}>
              <Text style={styles.replyPlaceholder}>Yanıtınızı buraya yazın...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.replySend}>
              <LinearGradient colors={COLORS.gradient} style={styles.sendIconBox}>
                <Ionicons name="send" size={18} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.dark,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },
  newTopicButton: {
    ...SHADOWS.light,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  newTopicText: {
    color: COLORS.white,
    fontWeight: '800',
    marginLeft: 6,
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  topicHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
    // Modern bir hava katmak için hafif gölge:
    ...SHADOWS.small,
  },
  topicItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  topicTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.dark,
    flex: 1,
    marginRight: 10,
    lineHeight: 24,
  },
  repliesBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  repliesCount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '800',
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  topicInfo: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '600',
  },
  topicDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topicDetailContent: {
    padding: 20,
    paddingBottom: 100,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 24,
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  topicDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#F3E8FF',
  },
  detailAuthor: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dark,
  },
  detailDate: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 16,
    lineHeight: 32,
  },
  detailContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 20,
    fontWeight: '500',
  },
  detailImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
  commentSection: {
    paddingHorizontal: 4,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 20,
  },
  commentItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    ...SHADOWS.light,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentAuthor: {
    fontWeight: '700',
    color: COLORS.primary,
    fontSize: 14,
  },
  commentText: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  noComments: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
  },
  replyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    ...SHADOWS.medium,
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  replyPlaceholder: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  replySend: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendIconBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
