/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * Paleta semântica única do app (tokens por FUNÇÃO, não por cor). Light + dark.
 * Consolidação do inventário (antes: ~12 cinzas de texto, ~6 fundos, hex inline em 24 telas).
 * Use via `useColors()` (não importe `Colors` direto nas telas) pra preparar o tema claro/escuro.
 * As chaves `text/background/backgroundElement/backgroundSelected/textSecondary` ficam por
 * compatibilidade com os componentes-template (themed-text/themed-view).
 */
export const Colors = {
  light: {
    // marca / primária
    brand: '#208AEF',
    brandDark: '#0274DF', // estado pressionado / variante forte
    brandTintBg: '#EEF4FF', // fundo de destaque azul claro
    onBrand: '#FFFFFF', // texto/ícone sobre a primária
    // sucesso
    success: '#1E9E54',
    successDark: '#1E8449',
    successTintBg: '#EAF7EF',
    // perigo
    danger: '#C0392B',
    dangerTintBg: '#FDECEA',
    // alerta
    warning: '#E6A700',
    warningText: '#8A6D00',
    warningTintBg: '#FFF7E0',
    criticalOrange: '#E67E22', // "acabando" / repor
    // superfícies e linhas
    bg: '#FAFBFC', // fundo da tela (off-white sutil)
    surface: '#FFFFFF', // cards / linhas / barras
    bgSubtle: '#F1F2F4', // segmented, cabeçalho de seção
    border: '#E6E6E6',
    divider: '#F0F0F0',
    // texto (4 tons no lugar de 12) — contraste melhorado p/ legibilidade dos hints
    text: '#1A1A1A',
    textSecondary: '#5E5E5E',
    textMuted: '#808080',
    textFaint: '#9E9E9E',
    // overlay (backdrops de modal)
    overlay: 'rgba(0,0,0,0.40)',
    // compat template (mapeadas pro novo sistema)
    background: '#FAFBFC',
    backgroundElement: '#F1F2F4',
    backgroundSelected: '#EEF4FF',
  },
  dark: {
    brand: '#3C9FFE',
    brandDark: '#208AEF',
    brandTintBg: '#16263A',
    onBrand: '#FFFFFF',
    success: '#2DB36A',
    successDark: '#1E9E54',
    successTintBg: '#16271E',
    danger: '#E5645A',
    dangerTintBg: '#2A1715',
    warning: '#E6A700',
    warningText: '#E6C765',
    warningTintBg: '#2A2410',
    criticalOrange: '#F08A3C',
    bg: '#121316',
    surface: '#1C1D20',
    bgSubtle: '#212225',
    border: '#2E3135',
    divider: '#26282B',
    text: '#F2F2F2',
    textSecondary: '#B8BCC2',
    textMuted: '#9AA0A6',
    textFaint: '#70757C',
    overlay: 'rgba(0,0,0,0.55)',
    background: '#121316',
    backgroundElement: '#212225',
    backgroundSelected: '#16263A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export type AppColors = { readonly [K in keyof (typeof Colors)['light']]: string };

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/**
 * Escala tipográfica sóbria/clean — espalhar nos estilos (`...Type.screenTitle`) p/ consistência entre
 * telas. Pesos e tamanhos padronizados; títulos de seção em caixa-alta com leve tracking.
 */
export const Type = {
  screenTitle: { fontSize: 22, fontWeight: '700' as const, letterSpacing: 0.2 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700' as const,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyStrong: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
