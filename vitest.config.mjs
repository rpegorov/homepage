import { defineConfig } from 'vitest/config';

// Тесты публикации из Drafta: экспортёр, publisher, контракт front matter.
export default defineConfig({
  test: {
    include: ['tests/**/*.spec.mjs'],
    testTimeout: 60_000,
  },
});
