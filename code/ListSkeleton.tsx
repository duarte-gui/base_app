import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { useColors } from '@/hooks/use-colors';
import type { AppColors } from '@/constants/theme';

/**
 * Placeholder pulsante enquanto a lista carrega — substitui o ActivityIndicator
 * "pelado" por algo que já insinua o formato das linhas (menos salto ao chegar os dados).
 */
export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 650, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.wrap} accessibilityLabel="Carregando" accessibilityRole="progressbar">
      {Array.from({ length: rows }).map((_, i) => (
        <Animated.View key={i} style={[styles.row, { opacity: pulse }]}>
          <View style={styles.dot} />
          <View style={styles.lines}>
            <View style={[styles.line, { width: `${70 - (i % 3) * 12}%` }]} />
            <View style={[styles.line, styles.lineSub, { width: `${40 - (i % 2) * 10}%` }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const makeStyles = (c: AppColors) =>
  StyleSheet.create({
    wrap: { paddingTop: 8 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    dot: { width: 22, height: 22, borderRadius: 6, backgroundColor: c.bgSubtle },
    lines: { flex: 1, gap: 7 },
    line: { height: 12, borderRadius: 6, backgroundColor: c.bgSubtle },
    lineSub: { height: 10 },
  });
