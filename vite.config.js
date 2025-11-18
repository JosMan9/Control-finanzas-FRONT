import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/index.js',
      name: 'control-gastos-componentes-lit',
      formats: ['es'], // SOLO ESM
      fileName: 'control-gastos-componentes-lit'
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    }
  }
});
