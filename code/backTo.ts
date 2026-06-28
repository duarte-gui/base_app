import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

/** Abas pra onde uma tela empilhada pode voltar. */
export type BackTab = '/(tabs)/list' | '/(tabs)/pantry' | '/(tabs)/recipes';

/**
 * Voltar SEMPRE pra aba de origem (brecha #37): `router.back()` resolvia pra URL /(tabs)/list
 * (base do redirect do índice), então navegamos explícito pra aba certa — no botão de Voltar
 * e no back de hardware (Android).
 *
 * Uso:
 *   const goBack = useBackToTab('/(tabs)/pantry');
 *   <Pressable onPress={goBack}>…</Pressable>
 */
export function useBackToTab(target: BackTab): () => void {
  const goBack = useCallback(() => {
    router.navigate(target);
  }, [target]);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        goBack();
        return true; // consome o evento (impede o pop padrão que ia pra Lista)
      });
      return () => sub.remove();
    }, [goBack]),
  );

  return goBack;
}
