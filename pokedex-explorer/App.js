import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './src/components/SearchBar';
import StatusView from './src/components/StatusView';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar onSearch={(text) => console.log('Search:', text)} />
        <View style={{ flex: 1 }}>
          {/* Try the three states: 'loading', 'error' and 'empty' */}
          <StatusView
            status="loading"
            message="No se pudo conectar con la API."
            onRetry={() => console.log('Retry')}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}