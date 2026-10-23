import { Text, View } from 'react-native';
import usePokemonList from './src/hooks/usePokemonList';
import usePokemonDetail from './src/hooks/usePokemonDetail';

export default function App() {
  const list = usePokemonList();
  const detail = usePokemonDetail(' Pikachu ');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{list.isLoading ? 'Loading list...' : `List: ${list.pokemon.length}`}</Text>
      <Text>{detail.status === 'success' ? `Detail: ${detail.pokemon.name}` : detail.status}</Text>
    </View>
  );
}