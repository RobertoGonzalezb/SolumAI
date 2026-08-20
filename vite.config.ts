import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Sin esto, Vite/esbuild puede emitir sintaxis más nueva de lo que
    // soporta Safari (visto en producción: "Unexpected token '{'" al
    // parsear el chunk de three.js/R3F) -- target explícito fuerza a
    // transpilar todo, dependencias incluidas, a algo que Safari sí puede
    // parsear.
    target: ['es2020', 'safari14'],
  },
})
