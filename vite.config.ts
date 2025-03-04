import { defineConfig, ServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

const host = process.env.TAURI_DEV_HOST

const hmr: ServerOptions['hmr'] | undefined = host
    ? {
            protocol: 'ws',
            host,
            port: 1421
        }
    : undefined

export default defineConfig(() => ({
    plugins: [
        vue(),
        UnoCSS(),
        Components({
            dts: './src/types/auto-import-components.d.ts'
        }),
        AutoImport({
            imports: ['vue', '@vueuse/core'],
            dts: './src/types/auto-imports.d.ts'
        })
    ],
    clearScreen: false,
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), 'src')
        }
    },
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr,
        watch: {
            ignored: ['**/src-tauri/**']
        }
    }
}))
