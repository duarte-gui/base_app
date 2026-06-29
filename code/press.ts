import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Feedback de toque sóbrio pra `Pressable`: leve fade (e opcional "afundar" de escala) enquanto
 * pressionado. Uso: `style={pressFade(styles.btn)}` ou `style={pressFade(styles.btn, { scale: true })}`.
 */
export function pressFade(
  base: StyleProp<ViewStyle>,
  opts?: { scale?: boolean; opacity?: number },
) {
  const op = opts?.opacity ?? 0.6;
  return ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
    base,
    pressed && { opacity: op, transform: opts?.scale ? [{ scale: 0.97 }] : undefined },
  ];
}
