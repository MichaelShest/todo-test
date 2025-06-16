import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/assets/scss/_vars.scss";
          @import "/src/assets/scss/_fonts.scss";`
      }
    }
  },
})
