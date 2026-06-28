# 📐 PLANEJAMENTO — <Nome do App>

> Template. Apague o que não usar. Mantenha vivo: marque `[x]` ao concluir; mova ideias do `IDEIAS.md`
> pra cá no lugar certo.

## 1. Visão
O que o app resolve, em 2-3 linhas. Persona(s). O "trabalho a ser feito".

## 2. Fontes de dados / integrações
APIs, bases (ex.: Open Food Facts), serviços. Com ressalva legal quando for scraping/seed.

## 3. Modelo de dados (Supabase)
Tabelas principais + **RLS por usuário** desde o início (`user_id = auth.uid()`). Migrations em
`supabase/migrations/00xx_*.sql`. Pensar dedup, índices, e o caso "compartilhado" (casa/família) cedo.

## 4. Fases (marcar `[x]`)
> Concentrar polimento na última fase, mas anotar UI/UX que surgir em qualquer fase.
- [ ] **Fase 1 — Fundação:** projeto Expo, Supabase, Auth/login, navegação, 1 fluxo ponta a ponta.
- [ ] **Fase 2 — Core:** o CRUD/feature central.
- [ ] **Fase 3 — <…>**
- [ ] **Fase N — UI/UX & Polimento (última):** tema, densidade, estados vazios, skeleton, animações,
  acessibilidade, onboarding (ver `09-UX-PATTERNS.md`).

## 5. Estrutura de pastas
Ver `00-SETUP.md`.

## 10. Decisões (§10)
Registrar decisões de produto/arquitetura com data e porquê (pra não reabrir):
- AAAA-MM-DD — <decisão> — <motivo>.

## 12. Brechas identificadas (§12) — backlog de correção
> **🔁 ROTINA OBRIGATÓRIA:** ao fim de **cada etapa**, simular jornadas reais e **caçar brechas**;
> registrar aqui com severidade (🔴 crítica / 🟡 média / 🟢 menor) e `✓` quando confirmada no código.
- [ ] **#1 <brecha>** — <descrição> — fix proposto.

> Quando acumular muito "pra depois", consolidar em `PENDENCIAS.md` (fila por impacto×dificuldade).
