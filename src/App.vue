<script setup lang="tsx">
import { greet } from '@/tauri-apps/invoke'

const name = ref('')
const text = ref('')

watchImmediate(name, async (newValue) => {
    text.value = await greet(newValue)
})

const a = (
    <el-button onClick={toggleDark}>
        <span>121212</span>
    </el-button>
)
</script>

<template>
    <el-button type="primary" @click="toggleDark">提交</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>default</el-button>
    <component :is="a" />
</template>
