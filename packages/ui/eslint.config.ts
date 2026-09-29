import { defineConfig } from "eslint/config";

import { baseConfig } from "@aliko/eslint-config/base";
import { reactConfig } from "@aliko/eslint-config/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig,
);
