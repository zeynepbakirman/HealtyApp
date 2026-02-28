import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Theme';
import { useAppContext } from '../../components/AppContext';

export default function NotificationsScreen() {
  const { notifications, currentUser, markNotificationsAsRead } = useAppContext();

  useEffect(() => {
    markNotificationsAsRead();
  }, []);

  const userNotifications = notifications.filter(n => n.userId === currentUser?.id || n.userId === 'all');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${hours}:${minutes}`;
  };

  const renderItem = ({ item }: { item: any }) => {
    let icon;
    let iconBg = '#F3E8FF';
    let iconColor = COLORS.primary;

    switch (item.type) {
      case 'homework':
      case 'comment':
        icon = <Ionicons name="mail-outline" size={24} color={iconColor} />;
        break;
      case 'affirmation':
      case 'like':
        icon = <MaterialCommunityIcons name="heart-outline" size={24} color={iconColor} />;
        break;
      case 'image':
        icon = <Ionicons name="image-outline" size={24} color={iconColor} />;
        break;
      default:
        icon = <Ionicons name="notifications-outline" size={24} color={iconColor} />;
    }

    return (
      <TouchableOpacity style={styles.notificationItem}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.notificationTitle}>
            {item.title}
          </Text>
          <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Bildirimler" showBack />
      {userNotifications.length > 0 ? (
        <FlatList
          data={userNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={COLORS.gray} />
          <Text style={styles.emptyText}>Henüz bildiriminiz yok.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6B7280',
  },
});
