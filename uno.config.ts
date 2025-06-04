import { defineConfig, presetMini, presetAttributify } from 'unocss'

export default defineConfig({
    presets: [
        presetMini(),
        presetAttributify({ strict: true, prefix: '', prefixedOnly: true })
    ]
})
