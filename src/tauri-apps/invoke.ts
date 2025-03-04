import { invoke } from '@tauri-apps/api/core'

/** 是否可以使用 tauri 的 api 方法 */
const canUseTauriApi = Boolean(window.__TAURI_INTERNALS__)

export async function greet(name: string) {
    if (!canUseTauriApi) {
        return `greet from ${name}!`
    }
    return await invoke('greet', { name }) as string
}
