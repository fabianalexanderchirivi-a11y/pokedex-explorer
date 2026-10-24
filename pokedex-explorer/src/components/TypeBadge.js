import { View, Text, StyleSheet } from 'react-native';
import { typeColors, defaultTypeColor } from '../theme/typeColors';
import { spacing } from '../theme/colors';

export default function TypeBadge({ type }) {
  const { label, color } = typeColors[type] ?? defaultTypeColor;

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});