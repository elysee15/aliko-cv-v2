import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@aliko/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  restrictEnvAccess,
);
