import { View } from 'react-native';

import { useColors } from '@/hooks/use-colors';

/**
 * Fundo sutil padrão das telas principais: a cor base do tema + algumas "manchas" muito leves na cor
 * de marca (baixa opacidade), pra dar profundidade sem atrapalhar a leitura. Fica ATRÁS do conteúdo
 * (absoluto, `pointerEvents none`). Placeholder até termos imagens próprias — trocável por `ImageBackground`.
 */
export function ScreenBackground() {
  const c = useColors();
  const fill = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };
  return (
    <View pointerEvents="none" style={[fill, { backgroundColor: c.bg }]}>
      <View
        style={{
          position: 'absolute',
          top: -90,
          right: -70,
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: c.brand,
          opacity: 0.05,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: c.brand,
          opacity: 0.04,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -70,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: c.success,
          opacity: 0.04,
        }}
      />
    </View>
  );
}
