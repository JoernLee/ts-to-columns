import { defineConfig } from "umi";

export default defineConfig({
  npmClient: 'npm',
  publicPath: '/ts-to-columns/',
  hash: true,
  history: {
    type: 'hash',
  },
});
