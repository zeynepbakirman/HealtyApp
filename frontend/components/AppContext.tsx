import React, { createContext, useContext, useState } from 'react';
import { USERS, INITIAL_POSTS } from '../constants/mockData';

export type User = {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
};

export type Post = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: string[]; // List of user IDs
  comments: Comment[];
  views: number;
  date: string;
  category: string;
  title?: string;
  replies?: number;
};

export type Notification = {
  id: string;
  userId: string;
  fromUserId: string;
  fromUserName: string;
  title: string;
  date: string;
  type: 'like' | 'comment' | 'homework' | 'affirmation';
  read: boolean;
};

export type Mood = {
  userId: string;
  date: string;
  emoji: string;
};

export type AppContextType = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  posts: Post[];
  forumTopics: Post[];
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markNotificationsAsRead: () => void;
  unreadCount: number;
  logout: () => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addPost: (content: string, image?: string, category?: string, title?: string) => void;
  allUsers: User[];
  moods: Mood[];
  saveMood: (emoji: string) => void;
  completedSurveys: string[];
  completeSurvey: (surveyId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [completedSurveys, setCompletedSurveys] = useState<string[]>([]);
  const [forumTopics, setForumTopics] = useState<Post[]>([
    {
      id: 'f1',
      authorId: '1',
      authorName: 'Esra Arbağ',
      authorAvatar: USERS[0].avatar,
      title: 'Beslenme Tavsiyeleri',
      content: 'Doğurganlığı desteklemek için hangi besinleri tüketiyorsunuz? Deneyimlerimizi paylaşalım.',
      likes: ['2', '3'],
      comments: [
        { id: 'fc1', userId: '2', userName: 'Merve Güneş', text: 'Koyu yeşil yapraklı sebzeler harika!' }
      ],
      views: 156,
      date: '2026-02-28T10:00:00Z',
      category: 'Forum',
      replies: 1
    },
    {
      id: 'f2',
      authorId: '4',
      authorName: 'Selin Akçay',
      authorAvatar: USERS[3].avatar,
      title: 'Yoga Deneyimleri',
      content: 'Haftada kaç gün yoga yapıyorsunuz?',
      likes: ['1'],
      comments: [],
      views: 89,
      date: '2026-02-27T15:30:00Z',
      category: 'Forum',
      replies: 0
    }
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: '1',
      fromUserId: 'system',
      fromUserName: 'Sistem',
      title: 'Uyku hijyen günlüğünüzü tutmayı unutmayın',
      date: '2026-02-28T10:56:00Z',
      type: 'homework',
      read: false,
    },
    {
      id: '2',
      userId: '1',
      fromUserId: 'system',
      fromUserName: 'Sistem',
      title: 'Çocuk sahibi olma ile ilgili olumlu düşüncelerimi her geçen gün artırıyorum',
      date: '2026-02-27T18:15:00Z',
      type: 'affirmation',
      read: false,
    },
    {
      id: '3',
      userId: '1',
      fromUserId: '2',
      fromUserName: 'Merve Güneş',
      title: 'Merve Güneş gönderinizi beğendi',
      date: '2026-02-28T11:20:00Z',
      type: 'like',
      read: false,
    },
    {
      id: '4',
      userId: '1',
      fromUserId: '3',
      fromUserName: 'Canan Yıldız',
      title: 'Canan Yıldız bir yorum bıraktı: "Harika bir paylaşım!"',
      date: '2026-02-28T12:45:00Z',
      type: 'comment',
      read: false,
    },
    {
      id: '5',
      userId: '1',
      fromUserId: 'system',
      fromUserName: 'Sistem',
      title: 'Yeni bir eğitim videosu eklendi: Hormon Dengesi',
      date: '2026-02-28T09:00:00Z',
      type: 'affirmation',
      read: false,
    },
    {
      id: '6',
      userId: '1',
      fromUserId: 'system',
      fromUserName: 'Sistem',
      title: 'Beslenme tavsiyeleri üzerine yeni bir görsel paylaşıldı.',
      date: '2026-02-28T08:30:00Z',
      type: 'affirmation',
      read: false,
    },
    {
      id: '7',
      userId: '1',
      fromUserId: 'system',
      fromUserName: 'Sistem',
      title: 'Bugün için planlanan ev ödevinizi tamamlamayı unutmayın.',
      date: '2026-02-28T07:15:00Z',
      type: 'homework',
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.userId === currentUser?.id && !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n))
    );
  };

  const likePost = (postId: string) => {
    if (!currentUser) return;

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(currentUser.id);
          const newLikes = isLiked
            ? post.likes.filter((id) => id !== currentUser.id)
            : [...post.likes, currentUser.id];

          if (!isLiked && post.authorId !== currentUser.id) {
            addNotification({
              userId: post.authorId,
              fromUserId: currentUser.id,
              fromUserName: currentUser.name,
              title: `${currentUser.name} gönderinizi beğendi`,
              date: new Date().toISOString(),
              type: 'like',
            });
          }

          return { ...post, likes: newLikes };
        }
        return post;
      });
    });

    setForumTopics((prev) => {
      return prev.map((topic) => {
        if (topic.id === postId) {
          const isLiked = topic.likes.includes(currentUser.id);
          const newLikes = isLiked
            ? topic.likes.filter((id) => id !== currentUser.id)
            : [...topic.likes, currentUser.id];
          return { ...topic, likes: newLikes };
        }
        return topic;
      });
    });
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser) return;

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Math.random().toString(36).substring(2, 9),
            userId: currentUser.id,
            userName: currentUser.name,
            text,
          };

          if (post.authorId !== currentUser.id) {
            addNotification({
              userId: post.authorId,
              fromUserId: currentUser.id,
              fromUserName: currentUser.name,
              title: `${currentUser.name} gönderinize yorum yaptı: "${text.substring(0, 20)}..."`,
              date: new Date().toISOString(),
              type: 'comment',
            });
          }

          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      });
    });

    setForumTopics((prev) => {
      return prev.map((topic) => {
        if (topic.id === postId) {
          const newComment: Comment = {
            id: Math.random().toString(36).substring(2, 9),
            userId: currentUser.id,
            userName: currentUser.name,
            text,
          };
          return {
            ...topic,
            comments: [...(topic.comments || []), newComment],
            replies: (topic.replies || 0) + 1
          };
        }
        return topic;
      });
    });
  };

  const addPost = (content: string, image?: string, category: string = 'Home', title?: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content,
      image,
      likes: [],
      comments: [],
      views: 0,
      date: new Date().toISOString(),
      category,
      title,
      replies: 0
    };

    if (category === 'Forum') {
      setForumTopics((prev) => [newPost, ...prev]);
    } else {
      setPosts((prev) => [newPost, ...prev]);
    }
  };

  const saveMood = (emoji: string) => {
    if (!currentUser) return;
    const newMood: Mood = {
      userId: currentUser.id,
      date: new Date().toISOString(),
      emoji
    };
    setMoods((prev) => [...prev, newMood]);
  };

  const completeSurvey = (surveyId: string) => {
    setCompletedSurveys((prev) => [...prev, surveyId]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        posts,
        forumTopics,
        notifications,
        addNotification,
        markNotificationsAsRead,
        unreadCount,
        logout,
        likePost,
        addComment,
        addPost,
        allUsers: USERS,
        moods,
        saveMood,
        completedSurveys,
        completeSurvey
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
