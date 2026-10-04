import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

/**
 * Supabase n'est ici que le plan de données : stockage et temps réel. Les
 * sessions appartiennent à Better Auth, jamais à Supabase Auth — `auth.uid()`
 * est donc toujours nul côté Postgres et aucune politique RLS ne peut
 * autoriser un utilisateur. L'autorisation se fait côté serveur, dans tRPC.
 */
export function supabaseEnv() {
  return createEnv({
    server: {
      /** Contourne RLS : ne doit jamais atteindre le navigateur. */
      SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    },
    client: {
      NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
    },
    clientPrefix: "NEXT_PUBLIC_",
    runtimeEnv: process.env,
    /** Une variable laissée vide dans `.env` vaut absente, pas chaîne vide. */
    emptyStringAsUndefined: true,
    skipValidation:
      !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
