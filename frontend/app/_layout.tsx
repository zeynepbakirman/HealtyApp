import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { ErrorBoundary } from './error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '../components/AppContext';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ErrorBoundary>
          <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(drawer)" />
              <Stack.Screen name="login" />
            </Stack>
          </ThemeProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </AppProvider>
  );
}
