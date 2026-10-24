import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { getStatLabel } from '../utils/format';

const MAX_STAT = 255; 
export default function StatBar({ name, value }) {
  // The width of the bar is proportional to the value (255 = full bar)
  const percentage = Math.min(value / MAX_STAT, 1) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{getStatLabel(name)}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  label: { width: 110, fontSize: 14, color: colors.text },
  value: { width: 36, fontSize: 14, fontWeight: 'bold', color: colors.text },
  track: {
    flex: 1,
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 5 },
});