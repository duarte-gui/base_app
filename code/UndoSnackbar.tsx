import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/** Estado/controle do snackbar de desfazer. `show(msg, onUndo)` dispara; some sozinho após `durationMs`. */
export function useUndoSnackbar(durationMs = 4000) {
  const [snack, setSnack] = useState<{ message: string } | null>(null);
  const onUndoRef = useRef<(() => void) | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clearTimer, []);

  const show = useCallback(
    (message: string, onUndo: () => void) => {
      clearTimer();
      onUndoRef.current = onUndo;
      setSnack({ message });
      timer.current = setTimeout(() => {
        onUndoRef.current = null;
        setSnack(null);
      }, durationMs);
    },
    [durationMs],
  );

  const runUndo = useCallback(() => {
    clearTimer();
    onUndoRef.current?.();
    onUndoRef.current = null;
    setSnack(null);
  }, []);

  return { snack, show, runUndo };
}

export function UndoSnackbar({
  snack,
  onUndo,
}: {
  snack: { message: string } | null;
  onUndo: () => void;
}) {
  if (!snack) return null;
  return (
    <View style={styles.bar}>
      <Text style={styles.msg} numberOfLines={1}>
        {snack.message}
      </Text>
      <Pressable onPress={onUndo} hitSlop={10}>
        <Text style={styles.btn}>DESFAZER</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  msg: { color: '#fff', fontSize: 14, flexShrink: 1 },
  btn: { color: '#7cc4ff', fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
});
