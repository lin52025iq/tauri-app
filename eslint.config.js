import globals from 'globals'
import jseslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import unocss from '@unocss/eslint-config/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['src-tauri', 'dist'] },
    jseslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx,vue}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            'no-undef': 'off',
            'no-undef-init': 'error',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
        }
    },
    ...pluginVue.configs['flat/strongly-recommended'],
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: { parser: tseslint.parser,
                ecmaFeatures: { jsx: true }
            }
        },
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/multi-word-component-names': ['error', { ignores: ['index'] }],
            'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false, ignores: ['/^el-/'] }],
            'vue/html-self-closing': ['error', { html: { void: 'always', normal: 'never' } }],
            'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: { max: 1 } }],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'vue/singleline-html-element-content-newline': 'off'
        }
    },
    stylistic.configs.customize({ indent: 4, commaDangle: 'never' }),
    {
        rules: {
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }]
        }
    },
    unocss
]
