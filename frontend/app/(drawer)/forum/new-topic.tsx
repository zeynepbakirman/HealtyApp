import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Alert, Platform } from 'react-native';
import { Header } from '../../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../../../constants/Theme';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../../../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewTopicScreen() {
  const router = useRouter();
  const { addPost } = useAppContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSend = () => {
    if (!title || !content) {
      Alert.alert('Hata', 'Lütfen başlık ve mesaj alanlarını doldurun.');
      return;
    }

    addPost(content, image || undefined, 'Forum', title);

    Alert.alert(
      'Başarılı',
      'Konunuz başarıyla oluşturuldu. 🎉',
      [{ text: 'Tamam', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Yeni Konu Oluştur" showBack />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Konu Başlığı</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Neyi merak ediyorsunuz?"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mesajınız</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Buraya detaylıca yazabilirsiniz..."
              multiline
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.removeImage} onPress={() => setImage(null)}>
                <Ionicons name="close-circle" size={28} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addImagePlaceholder} onPress={pickImage}>
              <Ionicons name="image-outline" size={32} color={COLORS.primary} />
              <Text style={styles.addImageText}>Görsel Ekle (Opsiyonel)</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.sendButton} onPress={handleSend}>
          <LinearGradient
            colors={COLORS.gradient}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="send" size={20} color={COLORS.white} />
            <Text style={styles.sendButtonText}>Konuyu Paylaş</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    ...SHADOWS.medium,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 8,
    marginLeft: 4,
  },
  titleInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: '600',
  },
  contentInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    fontSize: 16,
    color: COLORS.dark,
    height: 150,
    fontWeight: '500',
  },
  addImagePlaceholder: {
    height: 120,
    backgroundColor: '#F5F3FF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageText: {
    marginTop: 8,
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  removeImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 14,
  },
  sendButton: {
    ...SHADOWS.medium,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 18,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },
});
