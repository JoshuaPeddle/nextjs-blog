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
  'retries': {
    // Configure retry attempts for `cypress run`
    // Default is 0
    'runMode': 2,
  }
});