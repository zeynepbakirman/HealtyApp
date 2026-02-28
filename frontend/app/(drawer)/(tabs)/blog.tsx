import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Card';
import { COLORS } from '../../../constants/Theme';
import { useAppContext } from '../../../components/AppContext';

export default function BlogScreen() {
  const { posts } = useAppContext();
  const blogPosts = posts.filter(p => p.category === 'Blog');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Blog" />
      <FlatList
        data={blogPosts}
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
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Uzman Yazıları</Text>
            <Text style={styles.subText}>Sağlığınız için bilimsel ve güncel makaleler.</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    paddingBottom: 20,
  },
  headerBox: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
