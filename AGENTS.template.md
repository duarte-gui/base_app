# AGENTS — instruções do repo pro assistente

> Copie pra raiz do novo app como `AGENTS.md` (e referencie de `CLAUDE.md` com `@AGENTS.md`).

## Expo muda a cada versão
Ler a doc **versionada** antes de escrever código:
`https://docs.expo.dev/versions/v<SDK>.0.0/` (fixar o SDK aqui).

## Convenções
- Estrutura em `src/` (Expo Router em `src/app/`). Ver `base_app/00-SETUP.md`.
- Tema semântico (`src/constants/theme.ts` + `useColors()` + `makeStyles(c)`). Ver `base_app/06-THEME.md`.
- Verificar com `npx tsc --noEmit` + bundle do Metro. Commit local; push só sob pedido.
- Seguir as regras de `base_app/05-WORKFLOW.md`.

## Rotina obrigatória
Caça-brechas ao fim de cada etapa (registrar no `PLANEJAMENTO.md` §12).
