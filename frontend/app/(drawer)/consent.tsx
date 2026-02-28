import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConsentScreen() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    Alert.alert('Onaylandı!', 'Aydınlatılmış onam formunu başarıyla onayladınız. ✨');
  };

  return (
    <View style={styles.container}>
      <Header title="Onam Formu" showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Aydınlatılmış Onam</Text>
          <Text style={styles.text}>
            Bu uygulama, kadın sağlığı ve doğurganlık süreçleri hakkında bilgilendirme amaçlıdır. Uygulama içerisinde sunulan bilgiler tıbbi tavsiye yerine geçmez.
          </Text>

          <View style={styles.bulletItem}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.bulletText}>Verileriniz KVKK standartlarına uygun şekilde şifrelenmiş olarak saklanır.</Text>
          </View>

          <View style={styles.bulletItem}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.bulletText}>Kullanıcı deneyiminizi iyileştirmek için anonim veriler analiz edilebilir.</Text>
          </View>

          <View style={styles.bulletItem}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.bulletText}>İstediğiniz zaman hesabınızı ve tüm verilerinizi silebilirsiniz.</Text>
          </View>

          <View style={styles.bulletItem}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.bulletText}>Bu uygulama profesyonel bir tıbbi muayene veya teşhis hizmeti sunmamaktadır.</Text>
          </View>

          <Text style={styles.text}>
            Yukarıdaki maddeleri okuduğumu ve uygulama içerisindeki süreçlere dair bilgilendirildiğimi beyan ederim.
          </Text>

          <TouchableOpacity
            style={[styles.button, accepted && styles.buttonDisabled]}
            onPress={handleAccept}
            disabled={accepted}
          >
            <LinearGradient
              colors={accepted ? ['#9CA3AF', '#9CA3AF'] : COLORS.gradient}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name={accepted ? "checkmark-circle" : "document-text-outline"} size={22} color={COLORS.white} />
              <Text style={styles.buttonText}>{accepted ? 'Onayladınız!' : 'Okudum, Onaylıyorum'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
    fontWeight: '500',
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 10,
  },
});
