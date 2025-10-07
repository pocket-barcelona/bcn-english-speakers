/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { configDefaults, defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    // environment: 'jsdom',
    // setupFiles: ['./vitest.setup.ts'],
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    exclude: ['node_modules/**'],
    coverage: {
      // provider: 'v8',
      // enabled: true,
      // all: false, // Vitest 1.0 changed to true
      thresholds: {
        functions: 80,
        branches: 80,
        lines: 80,
        statements: 80
      },
      include: ['src/**/*'],
      exclude: [
        ...configDefaults.exclude,
        '**/*.stories.*',
        '**/*.data.*',
        '**/*.d.ts',
        '**/generated/**/*',
        '**/index.ts',
      ]
    }
  }
});

export default getViteConfig({
  // @ts-ignore
  test: config.test
});
