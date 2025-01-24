import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        'D:/SLIIT/Project/food-recipe/Cook-Craft/frontend/Cook-Craft-App'
      ]
    }
  }
});
