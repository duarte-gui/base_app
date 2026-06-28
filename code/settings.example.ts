// Store de configurações reutilizável (zustand + persist/AsyncStorage) com gate de hidratação.
// Copie pra src/store/settings.ts e acrescente os campos específicos do app.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
/** Densidade de listas: confortável (2 linhas) / compacto (1 linha) / ultra (1 linha enxuta). */
export type ListDensity = 'confortavel' | 'compacto' | 'ultra';

type SettingsState = {
  themeMode: ThemeMode;
  setThemeMode: (m: ThemeMode) => void;
  listDensity: ListDensity;
  setListDensity: (d: ListDensity) => void;
  onboardingSeen: boolean;
  setOnboardingSeen: (v: boolean) => void;
  // 👉 acrescente aqui os campos do seu app (ex.: limiares, toggles de feature, ordem manual de listas)
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      setThemeMode: (m) => set({ themeMode: m }),
      listDensity: 'compacto',
      setListDensity: (d) => set({ listDensity: d }),
      onboardingSeen: false,
      setOnboardingSeen: (v) => set({ onboardingSeen: v }),
    }),
    { name: 'app-settings', storage: createJSONStorage(() => AsyncStorage) },
  ),
);

/** True quando o estado persistido já carregou — evita "piscar" telas que dependem de flags (ex.: onboarding). */
export function useSettingsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => useSettings.persist.hasHydrated());
  useEffect(() => {
    if (useSettings.persist.hasHydrated()) setHydrated(true);
    const unsub = useSettings.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);
  return hydrated;
}
