import { Colors, type AppColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSettings } from '@/store/settings';

/**
 * Paleta semântica ativa. Use nas telas em vez de hex inline ou de `Colors` direto.
 * Respeita a preferência do usuário (Configurações → Tema): claro / escuro / seguir o sistema.
 */
export function useColors(): AppColors {
  const mode = useSettings((s) => s.themeMode);
  const scheme = useColorScheme();
  const active = mode === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : mode;
  return Colors[active];
}
