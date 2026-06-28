# 🧰 base_app — kit de partida pra apps novos (Expo + Supabase)

> Compilado do que deu certo na **Despensa Inteligente** pra **não recomeçar do zero** em cada app novo.
> Copie o que servir, ajuste o resto. Tudo aqui é **template/referência**, não um app rodando.

## Como usar (ao iniciar um app novo)
1. Lê o **`00-SETUP.md`** (stack, ferramentas, decisões de infra) e cria o projeto Expo.
2. Copia os **markdowns de loop** pra raiz do novo repo e começa a preencher:
   - `01-PLANEJAMENTO.template.md` → vira o `PLANEJAMENTO.md` do app
   - `02-PROGRESSO.template.md` → `PROGRESSO.md`
   - `03-IDEIAS.template.md` → `IDEIAS.md`
   - `04-PENDENCIAS.template.md` → `PENDENCIAS.md` (preenche quando começar a acumular "pra depois")
3. Lê o **`05-WORKFLOW.md`** (como a gente trabalha — regras de ouro) e o **`AGENTS.template.md`**.
4. Copia de `code/` as primitivas que for usar (tema, settings, navegação, componentes) — ver `06`–`09`.

## Índice
| Arquivo | O que é |
|---|---|
| `00-SETUP.md` | Stack, ferramentas (Expo/Supabase/EAS), Expo Go × dev build, libs-base |
| `01-PLANEJAMENTO.template.md` | Plano: visão, fases, decisões (§10), rotina de caça-brechas (§12) |
| `02-PROGRESSO.template.md` | Tracking de progresso por fase + histórico |
| `03-IDEIAS.template.md` | Caixa de entrada de ideias (pendentes → integradas) |
| `04-PENDENCIAS.template.md` | Backlog/fila por impacto × dificuldade (tiers A→G) |
| `05-WORKFLOW.md` | Regras de trabalho (lote, validar no device, push sob pedido, diálogo…) |
| `06-THEME.md` | Sistema de tema/tokens claro/escuro/sistema (`code/theme.ts`, `use-colors.ts`) |
| `07-AUTH-LOGIN.md` | Login Supabase, biometria, "esqueci a senha" (OTP + SMTP) |
| `08-SETTINGS.md` | Store de configurações (zustand persist + hidratação) — `code/settings.example.ts` |
| `09-UX-PATTERNS.md` | Padrões prontos: kebab, voltar-pra-aba, barra inferior+teclado, densidade, vazios, skeleton, undo, drag'n'drop, notificações |
| `10-INFRA.md` | Supabase self-hosted (Proxmox), migrations, SMTP, domínios |
| `AGENTS.template.md` | Instrução pro assistente no repo (ler docs versionados do Expo etc.) |
| `code/` | Arquivos-fonte reaproveitáveis (TypeScript/React Native) |

## Princípios que se pagaram
- **Tema semântico desde o dia 1** (tokens claro/escuro) — retrofitar cor depois dói.
- **Markdowns de loop vivos** (planejamento/progresso/ideias/pendências) — memória do projeto.
- **Caça-brechas ao fim de cada etapa** — achar problema cedo é barato.
- **Validar no device em lote**, commitar local, **push só sob pedido**.
- **Evitar APIs pagas/3ºs** quando der (preferir on-device / self-hosted).
