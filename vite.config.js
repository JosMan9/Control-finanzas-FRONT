import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/components/index.js',
      name: 'control-gastos-componentes-lit',
      formats: ['es'],
      fileName: (format) => `control-gastos-componentes-lit.${format}.js`,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      },
      external: []
    }
  },
  resolve: {
    alias: {
      fs: false,
      path: false,
      os: false,
      process: false
    }
  }
});
