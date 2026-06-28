# 🤝 WORKFLOW — como a gente trabalha (regras de ouro)

Destilado da Despensa. Vale pra qualquer app novo.

## Execução
- **Trabalhar em lote:** aplicar várias modificações de uma vez, commitando cada uma logicamente,
  **sem parar a cada passo**. Interromper o usuário só pra: (1) **validar no device** (feel/visual/gesto/
  notificação/biometria), (2) **decisão de produto** genuína, (3) **ação infra/destrutiva/externa**.
- **Verificar sozinho:** `npx tsc --noEmit` + bundle do Metro (ver `00-SETUP.md`) a cada mudança.
- **Commit local sempre; push só quando o usuário pedir** ("sobe pro GitHub"). Mensagem de commit termina com
  o rodapé `Co-Authored-By:` exigido.
- Ao fim de um lote, dar **resumo do que mudou + checklist do que validar no device**. Não pingar à toa.

## Ideias e prioridade
- **Categorizar IDEIAS na hora** (impacto × dificuldade) no `IDEIAS.md`/`PLANEJAMENTO.md`. **O usuário
  decide QUANDO aplicar.** Não perguntar a cada ideia.
- Backlog vira **fila por impacto×dificuldade** no `PENDENCIAS.md` (tiers A→G).

## Qualidade
- **Caça-brechas ao fim de cada etapa:** simular jornadas reais, registrar brechas no §12 com severidade.
- Não "consertar" o que é **design intencional** — verificar contra a intenção antes (registrar no §10/Tier G).

## Comunicação
- **Preferir diálogo aberto em texto** a menu de múltipla escolha pra decisões de design (o usuário gosta de
  descrever a própria visão; múltipla escolha gera atrito). Propor um caminho concreto pra ele confirmar/ajustar.
- Rótulos de botão de diálogo devem **casar com a pergunta** (pergunta sim/não → botões Sim/Não).

## Memória do projeto (pro assistente)
- Manter vivos: `PLANEJAMENTO.md`, `PROGRESSO.md`, `IDEIAS.md`, `PENDENCIAS.md`.
- Guardar fatos não óbvios (infra, decisões, pendências externas) na memória persistente, não no chat.

## Infra / produção
- Mudança em servidor de produção (Supabase, SMTP, migrations): **backup antes**, aplicar, **verificar**, e
  **confirmar com o usuário** ações fora-do-código. Segredos em `~/.config/secrets/*.env` (mode 600), nunca no chat.
