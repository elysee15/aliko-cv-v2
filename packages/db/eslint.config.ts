import { defineConfig } from "eslint/config";

import { baseConfig } from "@aliko/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
);
