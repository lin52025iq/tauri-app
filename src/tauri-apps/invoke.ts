import { invoke } from '@tauri-apps/api/core'
import { canUseTauriApi } from './index'

/** 创建文件
 * @param name 创建文件名
 * @param data 文件 blob
 * @return 返回创建的文件路径
 */
export async function createTempFile(name: string, data: Uint8Array) {
    if (!canUseTauriApi) return

    return await invoke('create_and_append_file', { name, data }) as string
}

/** 删除文件
 * @param path 需要删除的文件路径
 */
export async function deleteFile(path: string) {
    if (!path || !canUseTauriApi) return
    return await invoke('delete_file', { filePath: path })
}
