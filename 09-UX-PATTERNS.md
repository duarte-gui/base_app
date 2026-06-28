# 09 — Padrões de UX prontos (com código)

Primitivas em `code/`. Todas usam o tema (`useColors`/`makeStyles`) — copie e ajuste tokens/rotas.

## Navegação
- **Voltar pra aba de origem** — `code/backTo.ts` (`useBackToTab(target)`): navegação explícita pra aba certa
  no botão Voltar **e** no back de hardware (`BackHandler`). Resolve "voltar cai na aba errada" com Expo Router.
  Ajustar o tipo `BackTab` pras rotas do seu app.
- **⋮ Kebab** — `code/KebabMenu.tsx`: menu do topo padrão (Configurações/Sair + ações contextuais por tela).

## Listas / entrada
- **Barra inferior (input + ＋ + 📷)** no alcance do polegar. **Fix do teclado (Android edge-to-edge):**
  medir a altura real do teclado (`Keyboard.addListener` show/hide) e empurrar a barra via `paddingBottom`
  na `KeyboardAvoidingView` (não chutar; não subtrair insets). Sem isso, a barra não sobe no Android novo.
- **Densidade** (`listDensity`: confortável/compacto/ultra) controla nº de linhas, botões +/- e tamanho —
  ler de `useSettings` na Row.
- **Modal coberto pelo teclado:** ancorar o card em `bottom: kbHeight + margem` (reusa a altura medida).

## Feedback / estados
- **Estados vazios ricos:** emoji + título + dica (apontando a próxima ação), não texto seco.
- **Skeleton de loading** — `code/ListSkeleton.tsx`: linhas pulsando no lugar do spinner.
- **Desfazer (estilo Gmail)** — `code/UndoSnackbar.tsx`: snackbar "Desfazer" por alguns segundos após apagar.
- **Acessibilidade:** `accessibilityRole="button"` + `accessibilityLabel` em todo botão só-de-ícone.

## Drag'n'drop (long-press + arrasta)
- **Lista vertical** — `code/DraggableLists.tsx`: long-press "gruda" no dedo, arrasta, solta no lugar.
- **Grade (2+ colunas)** — `code/DraggableGrid.tsx`: idem em grade (mede a largura; `trailing` = célula fixa
  no fim, ex.: cartão "＋ Novo").
- Ambos: padrão `objectMove` + posições absolutas (reanimated) + `Gesture.Pan().activateAfterLongPress(220)`
  (não conflita com tap/scroll). Persistir a ordem (ex.: coluna `position` no banco ou array no settings).
- **Onde arrastar:** preferir uma tela/lista vertical dedicada a arrastar chips minúsculos num segmented
  (evita conflito tap × long-press × swipe). Fixar itens "default" fora da área arrastável.

## Notificações locais (exige dev build)
- `expo-notifications`. Padrão: `configureNotifications()` no boot (handler + canal Android);
  um componente "Sync" invisível observa os dados e **(re)agenda** (validade: por data) ou **avisa** (estoque
  baixo: imediato, com dedup por id em AsyncStorage pra só avisar na "entrada" do estado). Toque na notif →
  navega pra tela certa (via `data.kind`).

## Onboarding
Carrossel de slides (paged `ScrollView` + dots) em overlay, mostrado quando `hydrated && !onboardingSeen`.
