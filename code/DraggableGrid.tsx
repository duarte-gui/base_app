import { useEffect, useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

export type GridItem = { id: string };

function clamp(v: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, min), max);
}

function objectMove(obj: Record<string, number>, from: number, to: number) {
  'worklet';
  const out: Record<string, number> = {};
  for (const id in obj) {
    const p = obj[id];
    if (p === from) out[id] = to;
    else if (from < to && p > from && p <= to) out[id] = p - 1;
    else if (from > to && p < from && p >= to) out[id] = p + 1;
    else out[id] = p;
  }
  return out;
}

function Cell({
  id,
  positions,
  count,
  cols,
  cellW,
  cellH,
  gap,
  onReorder,
  children,
}: {
  id: string;
  positions: SharedValue<Record<string, number>>;
  count: number;
  cols: number;
  cellW: number;
  cellH: number;
  gap: number;
  onReorder: (ids: string[]) => void;
  children: React.ReactNode;
}) {
  const stepX = cellW + gap;
  const stepY = cellH + gap;
  const active = useSharedValue(false);
  const slot0 = positions.value[id] ?? 0;
  const left = useSharedValue((slot0 % cols) * stepX);
  const top = useSharedValue(Math.floor(slot0 / cols) * stepY);
  const startLeft = useSharedValue(0);
  const startTop = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id],
    (cur, prev) => {
      if (cur != null && cur !== prev && !active.value) {
        left.value = withSpring((cur % cols) * stepX, { damping: 20 });
        top.value = withSpring(Math.floor(cur / cols) * stepY, { damping: 20 });
      }
    },
  );

  const pan = Gesture.Pan()
    .activateAfterLongPress(220)
    .onStart(() => {
      active.value = true;
      const p = positions.value[id] ?? 0;
      startLeft.value = (p % cols) * stepX;
      startTop.value = Math.floor(p / cols) * stepY;
    })
    .onUpdate((e) => {
      left.value = startLeft.value + e.translationX;
      top.value = startTop.value + e.translationY;
      const col = clamp(Math.round(left.value / stepX), 0, cols - 1);
      const row = Math.max(0, Math.round(top.value / stepY));
      const newPos = clamp(row * cols + col, 0, count - 1);
      const oldPos = positions.value[id];
      if (newPos !== oldPos) positions.value = objectMove(positions.value, oldPos, newPos);
    })
    .onEnd(() => {
      const p = positions.value[id] ?? 0;
      left.value = withSpring((p % cols) * stepX, { damping: 20 });
      top.value = withSpring(Math.floor(p / cols) * stepY, { damping: 20 });
    })
    .onFinalize(() => {
      if (!active.value) return;
      active.value = false;
      const p = positions.value;
      const ids = Object.keys(p).sort((a, b) => p[a] - p[b]);
      runOnJS(onReorder)(ids);
    });

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    width: cellW,
    height: cellH,
    left: left.value,
    top: top.value,
    zIndex: active.value ? 10 : 0,
    transform: [{ scale: withSpring(active.value ? 1.04 : 1, { damping: 22 }) }],
    shadowColor: '#000',
    shadowOpacity: withSpring(active.value ? 0.2 : 0, { damping: 22 }),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: active.value ? 8 : 0,
  }));

  return (
    <Animated.View style={style}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1 }}>{children}</View>
      </GestureDetector>
    </Animated.View>
  );
}

/**
 * Grade reordenável por **long-press + arrastar** (2 colunas por padrão). N pequeno; mede a largura
 * (onLayout) e posiciona cada célula por absolute. `trailing` = célula fixa no fim (ex.: "＋ Novo"),
 * não arrastável. Chama `onReorder(ids)` ao soltar.
 */
export function DraggableGrid({
  data,
  cols = 2,
  cellHeight,
  gap = 12,
  onReorder,
  renderItem,
  trailing,
}: {
  data: GridItem[];
  cols?: number;
  cellHeight: number;
  gap?: number;
  onReorder: (ids: string[]) => void;
  renderItem: (item: GridItem) => React.ReactNode;
  trailing?: React.ReactNode;
}) {
  const [w, setW] = useState(0);
  const positions = useSharedValue<Record<string, number>>(
    Object.fromEntries(data.map((d, i) => [d.id, i])),
  );

  const idSet = [...data.map((d) => d.id)].sort().join(',');
  useEffect(() => {
    const ids = data.map((d) => d.id);
    const cur = positions.value;
    const kept = Object.keys(cur)
      .filter((id) => ids.includes(id))
      .sort((a, b) => cur[a] - cur[b]);
    const added = ids.filter((id) => !kept.includes(id));
    const ordered = [...kept, ...added];
    positions.value = Object.fromEntries(ordered.map((id, i) => [id, i]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSet]);

  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);
  const stepX = w > 0 ? w / cols : 0; // gap embutido no padding das células
  const cellW = stepX - gap;
  const total = data.length + (trailing ? 1 : 0);
  const rows = Math.ceil(total / cols);
  const height = rows * (cellHeight + gap);

  return (
    <View onLayout={onLayout} style={{ height: w > 0 ? height : cellHeight }}>
      {w > 0 &&
        data.map((item) => (
          <Cell
            key={item.id}
            id={item.id}
            positions={positions}
            count={data.length}
            cols={cols}
            cellW={cellW}
            cellH={cellHeight}
            gap={gap}
            onReorder={onReorder}>
            {renderItem(item)}
          </Cell>
        ))}
      {w > 0 && trailing ? (
        <View
          style={{
            position: 'absolute',
            width: cellW,
            height: cellHeight,
            left: (data.length % cols) * stepX,
            top: Math.floor(data.length / cols) * (cellHeight + gap),
          }}>
          {trailing}
        </View>
      ) : null}
    </View>
  );
}
