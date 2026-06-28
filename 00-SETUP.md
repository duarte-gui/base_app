# 00 — Setup, stack e ferramentas

## Stack base (validada na Despensa)
- **Expo SDK 56** (RN 0.85, React 19) — **Expo Router** (file-based em `src/app/`).
- **TypeScript** (strict).
- **TanStack Query** (`@tanstack/react-query`) — cache/estado servidor, mutations otimistas.
- **Zustand** (`zustand` + `persist`/AsyncStorage) — estado local/configurações.
- **Supabase** — Postgres + Auth + RLS + Edge Functions. **Self-hosted** (ver `10-INFRA.md`) ou Cloud.
- **react-native-reanimated** + **react-native-gesture-handler** — animação/gestos (drag'n'drop, swipe).
- **react-native-safe-area-context** — `SafeAreaView`/insets.

> ⚠️ **Expo muda a cada SDK.** Antes de codar, **ler a doc versionada**: `https://docs.expo.dev/versions/vXX.0.0/`.
> Fixar a versão no `AGENTS.md` (ver `AGENTS.template.md`).

## Criar o projeto
```
npx create-expo-app@latest meu-app --template            # TS + Expo Router
# estrutura em src/: mover app/ -> src/app/ e setar "main"/config se preciso
```
Layout de pastas que funcionou:
```
src/
  app/                # rotas (Expo Router). (auth)/, (tabs)/, [id].tsx, _layout.tsx
  components/         # UI reutilizável (KebabMenu, DraggableLists, ...)
  constants/theme.ts  # tokens de cor claro/escuro
  hooks/use-colors.ts # useColors()
  features/<dominio>/ # api.ts + hooks.ts por domínio (lists, pantry, ...)
  lib/                # supabase.ts, backTo.ts, helpers
  store/              # zustand (auth.ts, settings.ts)
```

## Expo Go × Dev Build (decisão importante)
- **Expo Go**: rápido pra começar (login, listas, navegação, câmera via expo-camera).
- **Dev Build (EAS)**: **necessário** pra módulos nativos que o Expo Go não traz:
  - `expo-notifications` (notificações locais), `expo-local-authentication` (biometria),
    `expo-secure-store`, `expo-dev-client`, OCR on-device (ML Kit), etc.
- Estratégia: começar no Expo Go; quando precisar de nativo, **fazer uma leva única de dev build**
  (juntar biometria + notificações + secure-store + OCR num build só).
- `eas.json` com profile `development`. Build: `eas build -p android --profile development`.

## Ferramentas por necessidade
| Preciso de… | Use |
|---|---|
| Backend (DB+Auth+RLS) | **Supabase** (self-hosted no Proxmox ou Cloud) |
| Base de produtos (código de barras) | **Open Food Facts** (grátis) → fallback **Cosmos/Bluesoft** (cota) |
| Notificações locais | `expo-notifications` (**dev build**) — ver padrão em `09-UX-PATTERNS.md` |
| Biometria | `expo-local-authentication` (**dev build**) + `expo-secure-store` p/ credenciais |
| Scanner de código | `expo-camera` (`CameraView`, `useCameraPermissions`) — roda no Expo Go |
| OCR / foto | **ML Kit on-device** (dev build) — evitar visão paga |
| E-mail (recovery) | SMTP no GoTrue — **Zoho** funcionou (`smtp.zoho.com:587`), ver `07`/`10` |
| Gestos/drag | reanimated + gesture-handler (componentes prontos em `code/`) |
| Afiliados/compra | Amazon Associates / NFC-e (fase de monetização) |
| Voz | Alexa Skill (Account Linking OAuth2 + Lambda → REST do Supabase) |

## Princípio de custo
Evitar ao máximo **APIs pagas / de terceiros**. Preferir **on-device** (OCR, etc.) e **self-hosted**
(Supabase). Quando um 3º for inevitável, isolar atrás de Edge Function (chave só no servidor) e ter fallback.

## Verificação local (sem device)
- `npx tsc --noEmit` — type-check.
- Bundle do Metro por rota:
  `curl -s -o /dev/null -w "%{http_code}" "http://localhost:8081/src/app/<rota>.bundle?platform=android&dev=true"`
  (codificar `[id]`→`%5Bid%5D`; manter `(tabs)` literal). 200 = compila.
- O **feel/visual/gesto** só valida no device — agrupar num checklist (ver `05-WORKFLOW.md`).
