import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@aliko/eslint-config/base";
import { nextjsConfig } from "@aliko/eslint-config/nextjs";
import { reactConfig } from "@aliko/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
