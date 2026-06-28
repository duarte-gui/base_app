# 06 — Tema / tokens (claro · escuro · sistema)

Arquivos: `code/theme.ts`, `code/use-colors.ts`. **Adotar no dia 1** — retrofitar cor depois é caro.

## Como funciona
- `theme.ts` define **tokens semânticos** (não cores cruas) em `Colors.light` e `Colors.dark`:
  `brand, onBrand, brandTintBg, success/successTintBg, danger/dangerTintBg, warning/warningTintBg,
  criticalOrange, bg, surface, bgSubtle, border, divider, text, textSecondary, textMuted, textFaint, overlay`.
  Tipo exportado: `AppColors`.
- `useColors()` retorna a paleta certa conforme `themeMode` ('light' | 'dark' | 'system') do settings store.
- **Padrão em todo componente** (factory de estilos, recriada quando a paleta muda):
  ```ts
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  // ...
  const makeStyles = (c: AppColors) => StyleSheet.create({ box: { backgroundColor: c.surface, color: c.text } });
  ```
- O toggle claro/escuro/sistema vai em Configurações (ver `08-SETTINGS.md`).

## Regras
- **Nunca** hardcodar `#fff`/`#000` em componente — usar token (`c.surface`, `c.text`, …).
- Overlays de modal: `c.overlay`. Texto sobre `brand`: `c.onBrand`.
- Dark mode ligado seguindo o sistema por padrão; rodapé/insets também tematizados.
- Ao criar tela nova: começar pelo `makeStyles(c)` — força usar tokens desde o início.

## Adaptar pro novo app
- Trocar o valor de `brand`/tints pela identidade do app; manter os nomes dos tokens.
- Conferir contraste (AA) nos dois temas.
