<script setup lang="ts">
import { greet } from '@/tauri-apps/invoke'

const name = ref('')
const text = ref('')

watchImmediate(name, async (newValue) => {
    text.value = await greet(newValue)
})

const submit = () => {
    window.localStorage.setItem('msg', name.value)
}
</script>

<template>
    <div text="red 16px/24px">
        12121211111
    </div>
    <PInputText v-model="name" />
    <PButton @click="submit">
        121212
    </PButton>
    <p>
        {{ text }}
    </p>
</template>
