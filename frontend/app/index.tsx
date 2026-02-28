import { Redirect } from 'expo-router';
import { useAppContext } from '../components/AppContext';

export default function Index() {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(drawer)/(tabs)" />;
}
