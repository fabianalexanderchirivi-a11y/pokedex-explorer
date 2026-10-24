import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

// Concept: UI states — shows loading, error or empty depending on the status prop.
// status: 'loading' | 'error' | 'empty'
export default function StatusView({ status, message, onRetry }) {
  return (
    <View style={styles.container}>
      {status === 'loading' && <ActivityIndicator size="large" color={colors.primary} />}

      <Text style={[styles.message, status === 'error' && styles.errorText]}>{message}</Text>

      {status === 'error' && onRetry ? (
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.md,
  },
  errorText: { color: colors.danger },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  pressed: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});