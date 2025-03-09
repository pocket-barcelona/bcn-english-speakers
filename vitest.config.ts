/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    coverage: {
      provider: "v8",
      enabled: true,
      all: false,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      include: ["src/**/*.{ts,tsx}"],
    },
    exclude: ["node_modules/**"],
  },
});
