import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    TEST: 'true',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  defaultCommandTimeout: 10000,
  video: false,
});