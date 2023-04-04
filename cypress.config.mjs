import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://192.168.2.162:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});