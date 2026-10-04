import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function emailEnv() {
  return createEnv({
    server: {
      /**
       * Facultative au build : `next build` tourne en `NODE_ENV=production` et
       * n'a aucune raison d'exiger une clé d'envoi. L'absence est rattrapée à
       * l'envoi, où elle est journalisée en erreur (voir `src/client.ts`).
       */
      RESEND_API_KEY: z.string().min(1).optional(),
      EMAIL_FROM: z.string().min(1).default("Aliko <onboarding@resend.dev>"),
      NODE_ENV: z.enum(["development", "production", "test"]).optional(),
    },
    runtimeEnv: process.env,
    /** Une variable laissée vide dans `.env` vaut absente, pas chaîne vide. */
    emptyStringAsUndefined: true,
    skipValidation:
      !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
