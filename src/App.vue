<script setup lang="ts">
import { greet } from '@/tauri-apps/invoke'

const name = ref('')
const text = ref('')

watchImmediate(name, async (newValue) => {
    text.value = await greet(newValue)
})
</script>

<template>
    <div text="red 16px/24px">
        12121211111
    </div>
    <input
        v-model="name"
        placeholder="请输入"
    />
    <p>
        {{ text }}
    </p>
</template>
