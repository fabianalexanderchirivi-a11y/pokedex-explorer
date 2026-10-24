import { Pressable, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { formatPokemonId, capitalize, getImageUrl } from '../utils/format';

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Concept: remote Image — a URL image needs explicit width and height or it is not visible. */}
      <Image source={{ uri: getImageUrl(pokemon.id) }} style={styles.image} resizeMode="contain" />
      <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.xs,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    alignItems: 'center',
  },
  pressed: { opacity: 0.6 },
  image: { width: 110, height: 110 },
  number: { fontSize: 12, color: colors.textMuted, marginTop: spacing.xs },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.text },
});