import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';
import { COLORS } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

const ROADMAP_STEPS = [
  { id: 1, title: 'Hazırlık Aşaması', description: 'Beslenme ve uyku düzeninin oturtulması.', status: 'completed' },
  { id: 2, title: 'Detoks Haftası', description: 'Vücudun toksinlerden arındırılması.', status: 'in_progress' },
  { id: 3, title: 'Hormonal Denge', description: 'Yoga ve masaj teknikleri ile destek.', status: 'pending' },
  { id: 4, title: 'Doğurganlık Penceresi', description: 'Takip ve doğru zamanlama.', status: 'pending' },
  { id: 5, title: 'Bekleme ve Sabır', description: 'Zihinsel rahatlama ve meditasyon.', status: 'pending' },
];

export default function RoadmapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Yol Haritası" showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Hedefinize giden yolda hangi aşamada olduğunuzu buradan takip edebilirsiniz.</Text>

        {ROADMAP_STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.timelineContainer}>
              <View style={[styles.dot, step.status === 'completed' && styles.dotCompleted, step.status === 'in_progress' && styles.dotInProgress]} />
              {index !== ROADMAP_STEPS.length - 1 && <View style={styles.line} />}
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                {step.status === 'completed' && <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />}
                {step.status === 'in_progress' && <Ionicons name="time" size={20} color={COLORS.primary} />}
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
  },
  intro: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    zIndex: 1,
  },
  dotCompleted: {
    backgroundColor: '#4CAF50',
  },
  dotInProgress: {
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 15,
    paddingBottom: 40,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
