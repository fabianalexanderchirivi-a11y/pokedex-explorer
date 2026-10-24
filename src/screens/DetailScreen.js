import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import usePokemonDetail from '../hooks/usePokemonDetail';
import StatusView from '../components/StatusView';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { colors, spacing } from '../theme/colors';
import { formatPokemonId, capitalize } from '../utils/format';

export default function DetailScreen({ query, onBack }) {
  const { pokemon, status, retry } = usePokemonDetail(query);

  // Concept: UI states — loading, not found (empty), error or success.
  const renderBody = () => {
    if (status === 'loading') {
      return <StatusView status="loading" message="Cargando ficha..." />;
    }
    if (status === 'notFound') {
      return (
        <StatusView status="empty" message={`No encontramos ningún Pokémon con "${query}".`} />
      );
    }
    if (status === 'error') {
      return (
        <StatusView
          status="error"
          message="No se pudo cargar la ficha. Revisa tu internet."
          onRetry={retry}
        />
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* Concept: remote Image — needs explicit width and height to be visible. */}
        <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />

        <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.typesRow}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measureBox}>
            <Text style={styles.measureLabel}>Altura</Text>
            <Text style={styles.measureValue}>{pokemon.height} m</Text>
          </View>
          <View style={styles.measureBox}>
            <Text style={styles.measureLabel}>Peso</Text>
            <Text style={styles.measureValue}>{pokemon.weight} kg</Text>
          </View>
        </View>

        <Text style={styles.section}>Estadísticas base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      {renderBody()}

      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        onPress={onBack}
      >
        <Text style={styles.backText}>Volver a la lista</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  image: { width: 220, height: 220, alignSelf: 'center' },
  number: { textAlign: 'center', color: colors.textMuted, fontSize: 14 },
  name: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  typesRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.md },
  measures: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  measureBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  measureLabel: { color: colors.textMuted, fontSize: 13 },
  measureValue: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  backButton: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  pressed: { opacity: 0.6 },
  backText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});