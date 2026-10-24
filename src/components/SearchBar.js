import { useState } from 'react';
import { View, TextInput, Pressable, Text, Keyboard, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

export default function SearchBar({ onSearch }) {
  // Concept: useState — stores what the user types.
  const [text, setText] = useState('');

  const handleSearch = () => {
    const cleanText = text.trim();
    if (cleanText.length === 0) return;
    Keyboard.dismiss();
    onSearch(cleanText);
  };

  return (
    <View style={styles.row}>
      {/* Concept: TextInput — autoCapitalize and autoCorrect off, as the workshop asks. */}
      <TextInput
        style={styles.input}
        placeholder="Busca por nombre o número..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});