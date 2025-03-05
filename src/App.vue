<script setup lang="ts">
import { greet } from '@/tauri-apps/invoke'
import { zhCN } from 'naive-ui'

const name = ref('')
const text = ref('')

watchImmediate(name, async (newValue) => {
    text.value = await greet(newValue)
})
</script>

<template>
    <n-config-provider
        inline-theme-disabled
        abstract
        preflight-style-disabled
        :locale="zhCN"
    >
        <n-theme-editor />
        <n-global-style />
        <div text="red 16px/24px">
            12121211111
        </div>
        <input v-model="name" placeholder="请输入" />
        <n-button>121212</n-button>
        <n-button>121212</n-button>
        <n-button>121212</n-button>
        <n-button>121212</n-button>
        <n-time-picker />
        <p text-red>
            {{ text }}
        </p>
    </n-config-provider>
</template>
