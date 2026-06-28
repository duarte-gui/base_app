# 10 — Infra (Supabase self-hosted) — padrões

> Genérico de propósito (sem IPs/domínios/segredos reais). Os endereços do seu ambiente ficam na
> **memória privada** do assistente / nos seus segredos locais, **não** aqui.

## Supabase self-hosted
- Roda via **docker compose** (stack oficial do Supabase: `auth`/GoTrue, `rest`/PostgREST, `db`/Postgres,
  `kong`, `storage`, `edge-functions`…). Pode ficar num **LXC/VM** (ex.: Proxmox) atrás de um túnel/reverse-proxy
  (ex.: Cloudflare Tunnel) com um domínio próprio. App aponta pra esse domínio via `EXPO_PUBLIC_SUPABASE_URL`.
- Alternativa: **Supabase Cloud** (mais simples; menos controle/custo).

## Migrations
- Versionar em `supabase/migrations/00xx_*.sql` no repo.
- Aplicar no banco (self-hosted): `psql` dentro do container do Postgres, ex.:
  `cat 00xx.sql | docker exec -i <container-db> psql -U postgres -d postgres -v ON_ERROR_STOP=1`.
- **Sempre** RLS por usuário; conferir policies (`\d <tabela>` mostra Policies).

## SMTP (recovery de senha) — ver `07-AUTH-LOGIN.md`
- Setar `SMTP_*` no `.env` do GoTrue → `docker compose up -d auth`. **Backup do `.env` antes** de editar.
- Verificar envio nos logs do container `auth` (procurar erro de SMTP/TLS/auth; duração ~3s = enviou).
- Suprimir warning de host: `GOTRUE_MAILER_EXTERNAL_HOSTS: <seu-dominio-da-api>` no serviço `auth`.

## Segredos
- Credenciais (SMTP, tokens, etc.) em `~/.config/secrets/*.env` (mode 600). **Nunca** no chat nem no repo.
- `.env` do app no `.gitignore`. Chaves de 3ºs só no servidor (Edge Function), nunca no bundle.

## Edge Functions (proxy de API de 3º)
Quando precisar de uma API externa com chave, expor via Edge Function (chave no servidor) e o app chama a
function — nunca embute a chave no app. Ter fallback e medir uso (tabela de quota).
