import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import { supabaseEnv } from "../env";

let browserClient: SupabaseClient | undefined;

/**
 * Client navigateur, clé anonyme. Il ne porte aucune session : Better Auth
 * garde la sienne dans un cookie et Supabase ignore tout de l'utilisateur.
 * N'en attendez donc aucune autorisation — seulement l'accès public décrit par
 * vos politiques RLS.
 */
export function createBrowserClient(): SupabaseClient {
  const env = supabaseEnv();

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase non configuré : renseignez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  browserClient ??= createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  return browserClient;
}
