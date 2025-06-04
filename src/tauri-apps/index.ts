/** 是否可以使用 tauri 的 api 方法 */
export const canUseTauriApi = Boolean(window.__TAURI_INTERNALS__)

export * from './invoke'
export * from './lib'
