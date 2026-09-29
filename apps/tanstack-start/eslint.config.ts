import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@aliko/eslint-config/base";
import { reactConfig } from "@aliko/eslint-config/react";

export default defineConfig(
  {
    ignores: [".nitro/**", ".output/**", ".tanstack/**"],
  },
  baseConfig,
  reactConfig,
  restrictEnvAccess,
);
