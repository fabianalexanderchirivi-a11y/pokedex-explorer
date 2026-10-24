import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from './src/components/PokemonCard';
import TypeBadge from './src/components/TypeBadge';
import StatBar from './src/components/StatBar';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View style={{ width: 180, height: 200 }}>
          <PokemonCard
            pokemon={{ id: 25, name: 'pikachu' }}
            onPress={() => console.log('Pressed')}
          />
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <TypeBadge type="electric" />
          <TypeBadge type="fire" />
          <TypeBadge type="water" />
        </View>

        <StatBar name="hp" value={35} />
        <StatBar name="special-attack" value={50} />
        <StatBar name="speed" value={255} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
