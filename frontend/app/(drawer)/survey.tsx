import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { COLORS, SHADOWS } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../components/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const STRES_QUESTIONS = [
  { id: 1, text: 'Son bir ayda kendinizi ne sıklıkla gergin veya stresli hissettiniz?', options: ['Hiç', 'Nadiren', 'Bazen', 'Sık sık', 'Her zaman'] },
  { id: 2, text: 'Beklenmedik bir olay karşısında ne kadar çabuk toparlanabiliyorsunuz?', options: ['Çok çabuk', 'Çabuk', 'Normal', 'Yavaş', 'Çok yavaş'] },
  { id: 3, text: 'Gelecek hakkında ne kadar endişeleniyorsunuz?', options: ['Hiç', 'Az', 'Orta', 'Çok', 'Aşırı'] },
  { id: 4, text: 'Uykuya dalmakta zorluk çekiyor musunuz?', options: ['Asla', 'Nadiren', 'Bazen', 'Sık sık', 'Her gece'] },
  { id: 5, text: 'Kendinize vakit ayırabiliyor musunuz?', options: ['Evet, her gün', 'Haftada birkaç kez', 'Bazen', 'Nadiren', 'Hiç'] },
];

const BESLENME_QUESTIONS = [
  { id: 1, text: 'Günde kaç öğün sebze tüketiyorsunuz?', options: ['Hiç', '1 Öğün', '2 Öğün', '3+ Öğün'] },
  { id: 2, text: 'Haftada kaç kez hazır/paketli gıda tüketiyorsunuz?', options: ['Hiç', '1-2 kez', '3-5 kez', 'Her gün'] },
  { id: 3, text: 'Günlük su tüketiminiz ne kadar?', options: ['1 litreden az', '1-2 litre', '2-3 litre', '3 litreden fazla'] },
  { id: 4, text: 'Şekerli içecek tüketim sıklığınız nedir?', options: ['Hiç', 'Nadiren', 'Haftada birkaç', 'Her gün'] },
  { id: 5, text: 'Kahvaltı yapma alışkanlığınız nasıl?', options: ['Her gün', 'Haftada birkaç', 'Nadiren', 'Asla'] },
];

export default function SurveyScreen() {
  const { completedSurveys, completeSurvey } = useAppContext();
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const QUESTIONS = activeSurvey === 'stres' ? STRES_QUESTIONS : BESLENME_QUESTIONS;

  const startSurvey = (id: string) => {
    setActiveSurvey(id);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    if (currentQuestion < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setShowResult(true);
      if (activeSurvey) completeSurvey(activeSurvey);
    }
  };

  const calculateScore = () => {
    const total = answers.reduce((acc, curr) => acc + curr, 0);
    const max = (QUESTIONS.length * (QUESTIONS[0].options.length - 1));
    const percentage = (total / max) * 100;

    if (activeSurvey === 'stres') {
      if (percentage < 30) return 'Düşük Stres - Harikasınız, dengeli bir yaşam sürüyorsunuz. ✨';
      if (percentage < 60) return 'Orta Stres - Bazı alanlarda kendinize daha fazla vakit ayırmalısınız. 🧘‍♀️';
      return 'Yüksek Stres - Profesyonel bir destek almanız önerilir. Yanınızdayız. 💜';
    } else {
      if (percentage > 70) return 'Sağlıklı Beslenme - Beslenme düzeniniz harika görünüyor! 🥗';
      if (percentage > 40) return 'Geliştirilebilir Beslenme - Küçük değişikliklerle daha iyi sonuçlar alabilirsiniz. 🍎';
      return 'Dikkat Edilmeli - Beslenme uzmanlarımızla görüşmeniz faydalı olabilir. 🥦';
    }
  };

  if (activeSurvey) {
    return (
      <View style={styles.container}>
        <Header title={activeSurvey === 'stres' ? "Stres Ölçümü" : "Beslenme Anketi"} showBack onBack={() => setActiveSurvey(null)} />
        <View style={styles.quizContainer}>
          {!showResult ? (
            <>
              <View style={styles.progressContainer}>
                <LinearGradient
                  colors={COLORS.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBar, { width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }]}
                />
              </View>
              <Text style={styles.questionCount}>Soru {currentQuestion + 1} / {QUESTIONS.length}</Text>
              <Text style={styles.questionText}>{QUESTIONS[currentQuestion].text}</Text>
              <View style={styles.optionsContainer}>
                {QUESTIONS[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleAnswer(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <LinearGradient colors={COLORS.gradient} style={styles.resultIconCircle}>
                <Ionicons name="checkmark" size={50} color={COLORS.white} />
              </LinearGradient>
              <Text style={styles.resultTitle}>Test Tamamlandı!</Text>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>Değerlendirmeniz:</Text>
                <Text style={styles.scoreText}>{calculateScore()}</Text>
              </View>
              <TouchableOpacity style={styles.finishButton} onPress={() => setActiveSurvey(null)}>
                <LinearGradient colors={COLORS.gradient} style={styles.buttonGradient}>
                  <Text style={styles.finishButtonText}>Anketlere Dön</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  const SURVEY_LIST = [
    { id: 'stres', title: 'Stres Seviyesi Ölçümü', duration: '3 dk', icon: 'pulse-outline', color: '#8A4AF3' },
    { id: 'beslenme', title: 'Beslenme Alışkanlıkları', duration: '4 dk', icon: 'nutrition-outline', color: '#FF69B4' },

  ];

  return (
    <View style={styles.container}>
      <Header title="Anketler" showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeBanner}>
          <LinearGradient colors={COLORS.gradient} style={styles.bannerGradient}>
            <Ionicons name="stats-chart" size={40} color="rgba(255,255,255,0.3)" style={styles.bannerIcon} />
            <Text style={styles.bannerTitle}>Kendini Keşfet</Text>
            <Text style={styles.bannerSub}>Anketleri doldurarak sana özel tavsiyeler alabilirsin.</Text>
          </LinearGradient>
        </View>

        {SURVEY_LIST.map((survey) => {
          const isCompleted = completedSurveys.includes(survey.id);
          return (
            <TouchableOpacity
              key={survey.id}
              style={[styles.surveyCard, isCompleted && styles.completedCard]}
              onPress={() => startSurvey(survey.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, { backgroundColor: survey.color + '15' }]}>
                <Ionicons name={survey.icon as any} size={24} color={survey.color} />
              </View>
              <View style={styles.surveyInfo}>
                <Text style={styles.surveyTitle}>{survey.title}</Text>
                <View style={styles.durationRow}>
                  <Ionicons name="time-outline" size={14} color={COLORS.gray} />
                  <Text style={styles.durationText}>{survey.duration}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                {isCompleted ? (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#059669" />
                    <Text style={styles.completedText}>Tamamlandı</Text>
                  </View>
                ) : (
                  <View style={styles.startBadge}>
                    <Text style={styles.startText}>Başla</Text>
                    <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
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
  welcomeBanner: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  bannerGradient: {
    padding: 24,
    position: 'relative',
  },
  bannerIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    maxWidth: '80%',
  },
  surveyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  completedCard: {
    opacity: 0.9,
    backgroundColor: '#F9FAFB',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  surveyInfo: {
    flex: 1,
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
    fontWeight: '500',
  },
  statusContainer: {
    marginLeft: 10,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  startBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  startText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  quizContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  questionCount: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 8,
  },
  scoreBox: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 24,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  scoreLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  finishButton: {
    marginTop: 40,
    width: '100%',
    ...SHADOWS.medium,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  finishButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
