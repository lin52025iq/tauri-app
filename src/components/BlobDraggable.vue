<template>
    <div v-loading="loading">
        <div
            ref="dragElement"
            draggable="true"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            class="draggable-item"
        >
            <slot></slot>
            <div>path: {{ tempPath }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createTempFile, deleteFile, handleDrag } from '@/tauri-apps'

const props = defineProps({
    blob: {
        type: Blob,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['start', 'end', 'error'])

const tempPath = ref<string>()

const loading = ref(false)
watchImmediate([() => props.blob, () => props.fileName], async () => {
    onWatcherCleanup(() => {
        if (tempPath.value) {
            deleteFile(tempPath.value)
        }
    })

    loading.value = true
    const arrayBuffer = await props.blob.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    tempPath.value = await createTempFile(props.fileName, data)

    await new Promise(resolve => setTimeout(resolve, 100))
    loading.value = false
})

const handleDragStart = async () => {
    if (!tempPath.value) return

    emit('start')
    try {
        await handleDrag([tempPath.value], () => {
            handleDragEnd()
        })
    } catch (error) {
        emit('error', error)
    }
}

const handleDragEnd = () => {
    emit('end')
}
</script>

<style lang="scss" scoped>
.draggable-item {
    padding: 12px 16px;
    background-color: #f5f5f5;
    border: 2px dashed #ccc;
    border-radius: 6px;
    cursor: grab;
    user-select: none;
    display: inline-block;
    position: relative;
}

.draggable-item:hover {
    border-color: #888;
    background-color: #eee;
}

.status {
    position: absolute;
    bottom: -25px;
    left: 0;
    font-size: 12px;
    color: #666;
}
</style>
