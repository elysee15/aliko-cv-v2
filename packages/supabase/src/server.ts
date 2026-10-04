import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import { supabaseEnv } from "../env";

let serviceClient: SupabaseClient | undefined;

/**
 * Client de service : il contourne RLS. Chaque appel doit donc avoir vérifié
 * lui-même, en amont, que l'utilisateur a le droit de toucher la ressource —
 * `protectedProcedure` dans `@aliko/api` est l'endroit prévu pour ça.
 */
export function createServiceClient(): SupabaseClient {
  const env = supabaseEnv();

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Supabase non configuré : renseignez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  serviceClient ??= createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  return serviceClient;
}
