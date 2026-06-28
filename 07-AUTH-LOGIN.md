# 07 — Auth / Login (Supabase)

## Base
- **Supabase Auth** (GoTrue). Cliente em `src/lib/supabase.ts` (`createClient(url, anonKey)` — url/anon via
  `EXPO_PUBLIC_*` no `.env`, **nunca** commitar `.env`).
- Store `src/store/auth.ts` (zustand): `session`, `init()` (assina `onAuthStateChange`), `signIn`,
  `signUp`, `signOut`.
- `src/app/index.tsx` redireciona `/` conforme sessão; `(auth)/login.tsx` pra login/cadastro.
- **RLS por usuário** em todas as tabelas (`user_id = auth.uid()`) desde o início.

## Login com biometria (conveniência) — exige **dev build**
- `expo-local-authentication`. Padrão que funcionou: caixinha "Entrar com digital" no login **captura a
  credencial** no 1º login; reabrir o login **dispara a biometria sozinha** e re-loga (`signInWithPassword`).
- ⚠️ **Segurança:** guardar a senha em **`expo-secure-store`**, não AsyncStorage (TODO clássico — não esquecer).

## "Esqueci a senha" (recuperação por código OTP)
- **App-side:** tela em 2 passos — (1) e-mail → `supabase.auth.resetPasswordForEmail(email)`;
  (2) código + nova senha → `verifyOtp({ type: 'recovery', email, token })` + `updateUser({ password })`.
- **Servidor (GoTrue) precisa de SMTP real** pra enviar o e-mail. Passos (ver `10-INFRA.md`):
  - Setar `SMTP_HOST/PORT/USER/PASS` + `SMTP_ADMIN_EMAIL` (=From) + `SMTP_SENDER_NAME` no `.env` do GoTrue.
  - **Zoho** funcionou: `smtp.zoho.com:587` com uma caixa `no-reply@seudominio` (reutilizável p/ outras ferramentas).
  - `docker compose up -d auth` e testar. O **template padrão do GoTrue (v2.18x) já inclui o código `{{ .Token }}`**
    de 6 dígitos — não precisou de template custom. (Se a sua versão mandar só link, customizar o template.)
  - Manter `ENABLE_EMAIL_AUTOCONFIRM=true` se o cadastro é aberto (só o recovery usa SMTP).

## Login social (Google/Apple) — futuro
`signInWithOAuth` + `expo-auth-session`; configurar provider no GoTrue. **Apple exige conta Developer paga**
e é obrigatório na App Store se houver outro login social.
