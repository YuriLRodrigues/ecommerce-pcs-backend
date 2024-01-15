import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
      exclude: [...configDefaults.exclude, '/test/', '/src/main.ts', '/src/infra/controller/dto'],
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
