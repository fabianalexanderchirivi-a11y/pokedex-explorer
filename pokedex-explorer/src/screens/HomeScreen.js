import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import usePokemonList from '../hooks/usePokemonList';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import StatusView from '../components/StatusView';
import { colors, spacing } from '../theme/colors';
export default function HomeScreen({ onSelectPokemon }) {
  const { pokemon, isLoading, isLoadingMore, error, loadMore, retry } = usePokemonList();
  // Bottom of the list: a spinner while loading more, or a retry button if it failed
  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator color={colors.primary} style={styles.footer} />;
    }
    if (error && pokemon.length > 0) {
      return (
        <Pressable style={styles.footer} onPress={retry}>
          <Text style={styles.footerError}>No se pudo cargar más. Toca para reintentar.</Text>
        </Pressable>
      );
    }
    return null;
  };
  // Concept: UI states — loading, error or success depending on the hook values.
  const renderContent = () => {
    if (isLoading) {
      return <StatusView status="loading" message="Cargando Pokémon..." />;
    }
    if (error && pokemon.length === 0) {
      return (
        <StatusView
          status="error"
          message="No se pudo conectar con la API. Revisa tu internet."
          onRetry={retry}
        />
      );
    }
    return (
      // Concept: FlatList — numColumns for the grid, keyExtractor for the keys
      // and onEndReached for the infinite scroll.
      <FlatList
        data={pokemon}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={() => onSelectPokemon(item.id)} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <SearchBar onSearch={onSelectPokemon} />
      {renderContent()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  list: { paddingHorizontal: spacing.sm, paddingBottom: spacing.lg },
  footer: { paddingVertical: spacing.md, alignItems: 'center' },
  footerError: { color: colors.danger },
});