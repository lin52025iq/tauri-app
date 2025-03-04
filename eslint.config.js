import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import unocss from '@unocss/eslint-config/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['src-tauri'] },
    { files: ['**/*.{js,ts,vue}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/strongly-recommended'],
    unocss,
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    stylistic.configs.customize({
        indent: 4,
        commaDangle: 'never'
    }),
    {
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/multi-word-component-names': ['error', {
                ignores: ['index']
            }],
            'vue/component-name-in-template-casing': ['error', 'PascalCase', {
                registeredComponentsOnly: true,
                ignores: []
            }],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'never'
                },
                svg: 'always',
                math: 'always'
            }],
            'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: { max: 1 } }],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'no-undef': 'off',
            'no-undef-init': 'error'
        }
    }
]
