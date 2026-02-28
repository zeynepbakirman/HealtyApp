export interface User {
  id: string;
  username: string;
  password?: string; // Soru işareti 'olsa da olur olmasa da' demek, hatayı çözer
  name: string;
  email: string;
  avatar: string;
  bio: string;
}
export const USERS = [
  {
    id: '1',
    username: 'esra',
    password: '123',
    name: 'Esra Arbağ',
    email: 'esra.arbag@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    bio: 'Kadın sağlığı ve doğurganlık uzmanı. Yolculuğunuzda yanınızdayım.',
  },
  {
    id: '2',
    username: 'merve',
    password: '123',
    name: 'Merve Güneş',
    email: 'merve.gunes@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    bio: 'Beslenme ve diyetetik tutkunu.',
  },
  {
    id: '3',
    username: 'canan',
    password: '123',
    name: 'Canan Yıldız',
    email: 'canan.yildiz@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    bio: 'Yoga ve meditasyon eğitmeni.',
  },
  {
    id: '4',
    username: 'selin',
    password: '123',
    name: 'Selin Akçay',
    email: 'selin.akcay@example.com',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    bio: 'Anne adayı ve blogger.',
  },
  {
    id: '5',
    username: 'ayse',
    password: '123',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@example.com',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop',
    bio: 'Psikolog ve aile danışmanı.',
  }
];

export const INITIAL_POSTS = [
  {
    id: '1',
    authorId: '1',
    authorName: 'Esra Arbağ',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    content: 'Doğurganlığı artıran atıştırmalıklar hakkında yeni blog yazım yayında! Bu tarifleri mutlaka denemelisiniz.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000',
    likes: ['2', '3'],
    comments: [
      { id: 'c1', userId: '2', userName: 'Merve Güneş', text: 'Çok faydalı bilgiler, teşekkürler!' }
    ],
    views: 125,
    date: '2026-02-27T10:30:00Z',
    category: 'Home'
  },
  {
    id: '2',
    authorId: '2',
    authorName: 'Merve Güneş',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    content: 'Beslenmenize bu 5 gıdayı eklemeyi unutmayın. Özellikle avokado ve ceviz çok önemli.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    likes: ['1'],
    comments: [
      { id: 'c2', userId: '1', userName: 'Esra Arbağ', text: 'Kesinlikle katılıyorum Merve hanım.' }
    ],
    views: 89,
    date: '2026-02-28T09:15:00Z',
    category: 'Blog'
  },
  {
    id: '3',
    authorId: '3',
    authorName: 'Canan Yıldız',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    content: 'Bugünkü yoga seansımızdan kareler. Rahatlamak için mutlaka deneyin.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    likes: ['4', '5'],
    comments: [],
    views: 156,
    date: '2026-02-28T11:00:00Z',
    category: 'Home'
  },

  {
    id: '5',
    authorId: '5',
    authorName: 'Ayşe Kaya',
    authorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop',
    content: 'Stres yönetimi ve doğurganlık arasındaki ilişki üzerine harika bir araştırma.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    likes: ['1'],
    comments: [],
    views: 112,
    date: '2026-02-28T15:45:00Z',
    category: 'Home'
  },
  {
    id: '6',
    authorId: '1',
    authorName: 'Esra Arbağ',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    content: 'Haftalık planınızı yaptınız mı? Yarın yeni bir hafta başlıyor!',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
    likes: [],
    comments: [],
    views: 78,
    date: '2026-02-28T18:00:00Z',
    category: 'Blog'
  },
  {
    id: '7',
    authorId: '2',
    authorName: 'Merve Güneş',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    content: 'Mevsim meyveleriyle hazırlayabileceğiniz sağlıklı bir tatlı tarifi.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1000',
    likes: ['3', '4'],
    comments: [],
    views: 95,
    date: '2026-02-27T20:30:00Z',
    category: 'Home'
  },
  {
    id: '8',
    authorId: '3',
    authorName: 'Canan Yıldız',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    content: 'Nefes egzersizleri döngünüzü nasıl düzenler? Detaylar profilimde.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    likes: ['5'],
    comments: [],
    views: 67,
    date: '2026-02-27T16:00:00Z',
    category: 'Blog'
  },

  {
    id: '10',
    authorId: '5',
    authorName: 'Ayşe Kaya',
    authorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop',
    content: 'Eşinizle olan iletişiminiz bu süreçte çok değerli. Küçük jestler yapmayı unutmayın.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000',
    likes: ['3'],
    comments: [],
    views: 88,
    date: '2026-02-26T21:15:00Z',
    category: 'Blog'
  }
];

export const SYSTEM_TIPS = [
  {
    id: 't1',
    title: 'Su Tüketimi',
    content: 'Günde en az 2-2.5 litre su içmek vücut ısısını dengeler ve toksinlerin atılmasını sağlar.',
    icon: 'water'
  },
  {
    id: 't2',
    title: 'Fiziksel Aktivite',
    content: 'Haftada en az 3 gün 30 dakikalık yürüyüşler hormon dengenizi destekler.',
    icon: 'walk'
  },
  {
    id: 't3',
    title: 'Uyku Düzeni',
    content: 'Melatonin salınımı için gece 23:00 ile 03:00 saatleri arasında karanlıkta uyuyor olmaya özen gösterin.',
    icon: 'moon'
  },
  {
    id: 't4',
    title: 'Kafein Sınırı',
    content: 'Günlük kafein tüketiminizi 200mg (yaklaşık 2 fincan kahve) ile sınırlandırmak doğurganlığı olumlu etkileyebilir.',
    icon: 'cafe'
  },
  {
    id: 't5',
    title: 'Stressiz Yaşam',
    content: 'Her gün 10 dakikanızı sadece nefesinize odaklanarak geçirmek kortizol seviyenizi düşürür.',
    icon: 'leaf'
  }
];

export const ROADMAP_DATA = [
  { title: 'Vücut Analizi', description: 'Mevcut durumunuzu anlamak için temel testler ve kontroller.', status: 'completed', date: '15 Ocak 2026' },
  { title: 'Beslenme Planı', description: 'Kişiye özel, doğurganlık destekleyici diyet programı.', status: 'completed', date: '01 Şubat 2026' },
  { title: 'Döngü Takibi', description: 'Ovülasyon ve hormon seviyelerinin düzenli izlenmesi.', status: 'in_progress', date: 'Devam Ediyor' },
  { title: 'Psikolojik Destek', description: 'Stres yönetimi ve motivasyon seansları.', status: 'pending', date: 'Gelecek Ay' },
  { title: 'Son Değerlendirme', description: 'Sürecin analizi ve bir sonraki adımların belirlenmesi.', status: 'pending', date: 'Planlanmadı' }
];

export const SURVEYS = [
  { id: 'stres', title: 'Stres Seviyesi Ölçümü', questions: 5, status: 'new', type: 'test' },
  { id: 'beslenme', title: 'Beslenme Alışkanlıkları', questions: 10, status: 'new', type: 'test' }
];

export const EXPERTS = [

  { id: 'e2', name: 'Dyt. Elif Kaya', title: 'Beslenme Uzmanı', rating: 4.8, image: 'https://i.pravatar.cc/150?u=elif' },
  { id: 'e3', name: 'Psk. Melis Aksoy', title: 'Aile Danışmanı', rating: 5.0, image: 'https://i.pravatar.cc/150?u=melis' },
  { id: 'e4', name: 'Canan Yıldız', title: 'Yoga Eğitmeni', rating: 4.7, image: 'https://i.pravatar.cc/150?u=canan' }
];
