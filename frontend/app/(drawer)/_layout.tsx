import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '../../components/CustomDrawerContent';
import { COLORS } from '../../constants/Theme';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,
        drawerStyle: {
          width: '80%',
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Ana Sayfa' }} />
      <Drawer.Screen name="notifications" options={{ drawerLabel: 'Bildirimler' }} />
      <Drawer.Screen name="homework" options={{ drawerLabel: 'Ev Ödevi' }} />
      <Drawer.Screen name="lessons/index" options={{ drawerLabel: 'Kurslar' }} />
      <Drawer.Screen name="counseling" options={{ drawerLabel: 'Danışmanlık' }} />
      <Drawer.Screen name="roadmap" options={{ drawerLabel: 'Yol Haritası' }} />
      <Drawer.Screen name="survey" options={{ drawerLabel: 'Anket' }} />
      <Drawer.Screen name="about" options={{ drawerLabel: 'Hakkımızda' }} />
      <Drawer.Screen name="consent" options={{ drawerLabel: 'Onam' }} />
      <Drawer.Screen name="info-page" options={{ drawerLabel: 'Bilgilendirme' }} />
    </Drawer>
  );
}
