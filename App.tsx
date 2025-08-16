import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PeopleScreen } from './src/app/screens/PeopleScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <PeopleScreen />
    </SafeAreaProvider>
  );
}