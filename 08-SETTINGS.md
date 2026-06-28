# 08 — Configurações (store + tela)

Arquivo: `code/settings.example.ts` → copie pra `src/store/settings.ts`.

## Store (zustand + persist)
- `useSettings` persiste em AsyncStorage (`createJSONStorage`).
- **Gate de hidratação** `useSettingsHydrated()` — usar pra não "piscar" telas que dependem de flags
  persistidas (ex.: onboarding) antes do estado carregar:
  ```tsx
  const hydrated = useSettingsHydrated();
  const onboardingSeen = useSettings((s) => s.onboardingSeen);
  // só renderiza o onboarding quando: hydrated && !onboardingSeen
  ```
- Campos comuns já no template: `themeMode`, `listDensity`, `onboardingSeen`. Acrescente os do app
  (limiares, toggles de feature, **ordem manual** de listas/itens p/ drag, etc.).

## Tela de Configurações (padrão)
- `ScrollView` com seções (Aparência/Tema, Listas/Densidade, …) usando `makeStyles(c)`.
- Controles comuns: **segmented control** (tema claro/escuro/sistema; densidade) e **Switch** (toggles).
- Padrão de seção: `<Text section>Título</Text>` + `<View card>…</View>` + `<Text help>explicação</Text>`.
- Itens só-de-dev (playground, botões de teste) atrás de `{__DEV__ ? (...) : null}` — somem no build de produção.

## Dica
Reaproveite o **segmented control** e o **card** como estilos base; densidade (`listDensity`) controla
linhas das telas de lista (ver `09-UX-PATTERNS.md`).
