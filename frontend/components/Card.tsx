import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, Modal, FlatList, TextInput, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/Theme';
import { useAppContext } from './AppContext';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  date: string;
  likes: string[];
  comments: any[];
  views: number;
  showActions?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Card: React.FC<CardProps> = ({
  id,
  authorName,
  authorAvatar,
  content,
  image,
  date,
  likes,
  comments,
  views,
  showActions = true,
}) => {
  const { currentUser, likePost, addComment } = useAppContext();
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  const isLiked = currentUser ? likes.includes(currentUser.id) : false;

  const handleLike = () => {
    if (!currentUser) {
      Alert.alert('Giriş Gerekli', 'Beğenmek için giriş yapmalısınız.');
      return;
    }
    likePost(id);
  };

  const handleAddComment = () => {
    if (!currentUser) {
      Alert.alert('Giriş Gerekli', 'Yorum yapmak için giriş yapmalısınız.');
      return;
    }
    if (commentText.trim()) {
      addComment(id, commentText);
      setCommentText('');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return `${d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return dateString;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.authorRow}>
          <Image source={{ uri: authorAvatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.date}>{formatDate(date)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.content}>{content}</Text>
      </View>

      {image && (
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator style={styles.loader} color={COLORS.primary} />
          )}
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      )}

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="heart" size={14} color="#FF3B30" />
          <Text style={styles.statsText}>{likes.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble" size={12} color="#6B7280" />
          <Text style={styles.statsText}>{comments.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="eye" size={14} color="#6B7280" />
          <Text style={styles.statsText}>{views}</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={handleLike}
          >
            <LinearGradient
              colors={isLiked ? COLORS.pinkGradient : ['#F3F4F6', '#F3F4F6']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color={isLiked ? COLORS.white : "#6B7280"}
              />
              <Text style={[styles.actionText, isLiked && { color: COLORS.white }]}>
                {isLiked ? 'Beğendin' : 'Beğen'}
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => setCommentModalVisible(true)}
          >
            <View style={[styles.actionGradient, { backgroundColor: '#F3F4F6' }]}>
              <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
              <Text style={styles.actionText}>Yorumlar</Text>
            </View>
          </Pressable>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Yorumlar</Text>
                <Text style={styles.modalSubtitle}>{comments.length} yorum</Text>
              </View>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Image source={{ uri: `https://ui-avatars.com/api/?name=${item.userName}&background=random` }} style={styles.commentAvatar} />
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentUser}>{item.userName}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Ionicons name="chatbubbles-outline" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyComments}>Henüz yorum yapılmamış. İlk sen ol!</Text>
                </View>
              )}
              style={styles.commentList}
              showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Yorumunuzu buraya yazın..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
                  <LinearGradient
                    colors={COLORS.gradient}
                    style={styles.sendGradient}
                  >
                    <Ionicons name="send" size={20} color={COLORS.white} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    marginVertical: 12,
    marginHorizontal: 16,
    ...SHADOWS.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dark,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    fontWeight: '500',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  actionsRow: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '80%',
    padding: 24,
    ...SHADOWS.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.dark,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  commentList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  commentUser: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyComments: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 15,
    fontSize: 15,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 120,
    fontSize: 15,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});