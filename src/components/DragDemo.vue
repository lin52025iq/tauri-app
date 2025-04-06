<template>
    <div class="container">
        <div class="controls">
            <el-button @click="createTextBlob">创建文本文件</el-button>
            <el-button @click="createImageBlob">创建图片文件</el-button>
            <el-button @click="createAudioBlob">创建Audio文件</el-button>
            <el-date-picker />
        </div>

        <div class="drag-items">
            <BlobDraggable
                v-if="textBlob"
                :blob="textBlob"
                file-name="示例文档.txt"
                @error="onError"
            >
                <el-button @click="textBlob = null">清除</el-button>
                拖拽文本文件
            </BlobDraggable>

            <BlobDraggable
                v-if="imageBlob"
                :blob="imageBlob"
                file-name="示例图片.png"
                @error="onError"
            >
                <el-button @click="imageBlob = null">清除</el-button>
                拖拽图片文件
            </BlobDraggable>

            <BlobDraggable
                v-if="audioBlob"
                :blob="audioBlob"
                file-name="示例音频.mp3"
                @error="onError"
            >
                <el-button @click="audioBlob = null">清除</el-button>
                拖拽音频文件
            </BlobDraggable>
        </div>

        <div v-if="statusMessage" class="status-message">
            {{ statusMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
const textBlob = ref<Blob | null>(null)
const imageBlob = ref<Blob | null>(null)
const audioBlob = ref<Blob | null>(null)
const statusMessage = ref('')

const createTextBlob = () => {
    const content = `这是生成的文本文件内容\n创建时间: ${new Date().toLocaleString()}`
    textBlob.value = new Blob([content], { type: 'text/plain' })
    statusMessage.value = '已创建文本文件，可拖拽到其他应用'
}

const createImageBlob = async () => {
    try {
        // 这里可以使用你的实际图片数据
        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200
        const ctx = canvas.getContext('2d')!

        // 绘制简单图片
        ctx.fillStyle = '#4CAF50'
        ctx.fillRect(0, 0, 200, 200)
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '14px Arial'
        ctx.fillText(`创建时间: ${new Date().toLocaleString()}`, 10, 100)
        ctx.font = '20px Arial'
        ctx.fillText('示例图片', 10, 50)

        canvas.toBlob((blob) => {
            imageBlob.value = blob
            statusMessage.value = '已创建图片文件，可拖拽到其他应用'
        }, 'image/png')
    } catch (_) {
        statusMessage.value = '创建图片失败'
    }
}

const createAudioBlob = async () => {
    /* @vite-ignore */
    const audioUrl = new URL('@/assets/demo.mp3', import.meta.url)
    const response = await fetch(audioUrl)
    if (!response.ok) {
        throw new Error(`HTTP错误! 状态: ${response.status}`)
    }

    audioBlob.value = await response.blob()
    statusMessage.value = '已创建音频文件，可拖拽到其他应用'
}

const onError = (error: Error) => {
    statusMessage.value = '拖拽出错: ' + JSON.stringify(error)
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.controls {
    margin: 20px 0;
}

.controls button {
    margin-right: 10px;
    padding: 8px 16px;
}

.drag-items {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 30px;
}

.status-message {
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
}
</style>
