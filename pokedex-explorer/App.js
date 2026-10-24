import { useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import { colors } from './src/theme/colors';

export default function App() {
  // Concept: useState — decides which view is visible
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Concept: useEffect (dependency array)
  useEffect(() => {
    if (selectedQuery === null) return undefined;

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelectedQuery(null);
      return true;
    });

    return () => subscription.remove();
  }, [selectedQuery]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style="dark" />

        {/* The list stays mounted (only hidden) so it keeps its items and scroll */}
        <View style={{ flex: 1, display: selectedQuery === null ? 'flex' : 'none' }}>
          <HomeScreen onSelectPokemon={setSelectedQuery} />
        </View>

        {selectedQuery !== null && (
          <DetailScreen query={selectedQuery} onBack={() => setSelectedQuery(null)} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}