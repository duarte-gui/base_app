import { useEffect } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

export type DraggableItem = { id: string };

function clamp(v: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, min), max);
}

/** Move a posição `from`→`to` num mapa id→slot, empurrando os do meio (worklet). */
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

function Row({
  id,
  positions,
  count,
  rowHeight,
  onReorder,
  children,
}: {
  id: string;
  positions: SharedValue<Record<string, number>>;
  count: number;
  rowHeight: number;
  onReorder: (ids: string[]) => void;
  children: React.ReactNode;
}) {
  const active = useSharedValue(false);
  const top = useSharedValue((positions.value[id] ?? 0) * rowHeight);
  const startTop = useSharedValue(0);

  // quando a posição muda (porque outro item foi arrastado), desliza pro novo slot
  useAnimatedReaction(
    () => positions.value[id],
    (cur, prev) => {
      if (cur != null && cur !== prev && !active.value) {
        top.value = withSpring(cur * rowHeight, { damping: 20 });
      }
    },
  );

  const pan = Gesture.Pan()
    .activateAfterLongPress(220)
    .onStart(() => {
      active.value = true;
      startTop.value = (positions.value[id] ?? 0) * rowHeight;
    })
    .onUpdate((e) => {
      top.value = startTop.value + e.translationY;
      const newPos = clamp(Math.round(top.value / rowHeight), 0, count - 1);
      const oldPos = positions.value[id];
      if (newPos !== oldPos) {
        positions.value = objectMove(positions.value, oldPos, newPos);
      }
    })
    .onEnd(() => {
      top.value = withSpring((positions.value[id] ?? 0) * rowHeight, { damping: 20 });
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
    left: 0,
    right: 0,
    top: top.value,
    height: rowHeight,
    zIndex: active.value ? 10 : 0,
    transform: [{ scale: withSpring(active.value ? 1.03 : 1) }],
    shadowColor: '#000',
    shadowOpacity: withSpring(active.value ? 0.18 : 0),
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
 * Lista vertical reordenável por **long-press + arrastar** (gruda no dedo). N pequeno → cada linha é
 * posicionada por absolute/transform (reanimated). Chama `onReorder(ids)` ao soltar.
 */
export function DraggableLists({
  data,
  rowHeight,
  onReorder,
  renderItem,
}: {
  data: DraggableItem[];
  rowHeight: number;
  onReorder: (ids: string[]) => void;
  renderItem: (item: DraggableItem) => React.ReactNode;
}) {
  const positions = useSharedValue<Record<string, number>>(
    Object.fromEntries(data.map((d, i) => [d.id, i])),
  );

  // re-sincroniza o mapa só quando o CONJUNTO de ids muda (entra/sai) — não a cada render nem ao
  // reordenar (mesmo conjunto), pra não atropelar o resultado do arraste.
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

  return (
    <View style={{ height: data.length * rowHeight }}>
      {data.map((item) => (
        <Row
          key={item.id}
          id={item.id}
          positions={positions}
          count={data.length}
          rowHeight={rowHeight}
          onReorder={onReorder}>
          {renderItem(item)}
        </Row>
      ))}
    </View>
  );
}
