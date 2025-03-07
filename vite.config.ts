import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(() => {
    return ({
        plugins: [
            vue(),
            vueJsx(),
            UnoCSS(),
            Components({
                dts: './src/types/auto-import-components.d.ts',
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
            }),
            AutoImport({
                imports: ['vue', '@vueuse/core'],
                dts: './src/types/auto-imports.d.ts',
                dirs: ['./src/constants', './src/composables'],
                vueTemplate: true,
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
            })
        ],
        clearScreen: false,
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/element-plus/vars/index.scss" as *;`
                }
            }
        },
        server: {
            port: 1420,
            strictPort: true,
            host: host || false,
            hmr: host
                ? {
                        protocol: 'ws',
                        host,
                        port: 1421
                    }
                : undefined,
            watch: {
                ignored: ['**/src-tauri/**']
            }
        },
        envPrefix: ['VITE_', 'TAURI_ENV_'],
        build: {
            // Tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
            target: process.env.TAURI_ENV_PLATFORM == 'windows'
                ? 'chrome105'
                : 'safari13',
            // 在 debug 构建中不使用 minify
            minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' as const : false,
            // 在 debug 构建中生成 sourcemap
            sourcemap: !!process.env.TAURI_ENV_DEBUG
        }
    })
})
