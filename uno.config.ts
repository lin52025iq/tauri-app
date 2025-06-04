import { defineConfig, presetMini, presetAttributify } from 'unocss'

export default defineConfig({
    presets: [
        presetMini({ preflight: 'on-demand' }),
        presetAttributify({ strict: true, prefix: '', prefixedOnly: true })
    ]
})
