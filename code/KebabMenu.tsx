import { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/hooks/use-colors';
import type { AppColors } from '@/constants/theme';

export type KebabItem = { label: string; onPress: () => void; danger?: boolean };

/** Menu ⋮ padrão do topo das telas (Lista/Despensa/Receitas). Itens variam por tela. */
export function KebabMenu({ items }: { items: KebabItem[] }) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        style={styles.kebab}
        onPress={() => setOpen(true)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Menu de opções">
        <Text style={styles.kebabDots}>⋮</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {items.map((it) => (
              <Pressable
                key={it.label}
                style={styles.menuItem}
                onPress={() => {
                  setOpen(false);
                  it.onPress();
                }}>
                <Text style={[styles.menuText, it.danger && { color: c.danger }]}>{it.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const makeStyles = (c: AppColors) =>
  StyleSheet.create({
    kebab: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    kebabDots: { fontSize: 22, fontWeight: '900', color: c.textSecondary, lineHeight: 24 },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' },
    menu: {
      position: 'absolute',
      top: 52,
      right: 10,
      backgroundColor: c.surface,
      borderRadius: 12,
      paddingVertical: 4,
      minWidth: 190,
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },
    menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
    menuText: { fontSize: 15, fontWeight: '600', color: c.text },
  });
