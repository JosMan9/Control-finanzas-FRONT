import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/index.js',
      name: 'control-gastos-componentes-lit',
      fileName: (format) => `control-gastos-componentes-lit.${format}.js`,
    },
  },
});