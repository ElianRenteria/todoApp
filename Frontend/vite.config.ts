import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import AutoImport from "unplugin-auto-import/vite";

import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todolist/',
  plugins: [
    vue(),
    // Auto-import Vue APIs like `ref`, `computed`, etc.
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts", // generates TypeScript declaration
    }),
    // Automatically import components
    Components({
      resolvers: [PrimeVueResolver()],
      dts: "src/components.d.ts", // generates TypeScript declaration
    }),
    tsconfigPaths({
      loose: true,
    }),
  ],
});
