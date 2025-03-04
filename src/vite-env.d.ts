/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
    export default component
}

interface Window {
    /** tauri 提供调用 rust 方法的接口
     * - 这里 仅用于 判断这个接口是否存在, 来确定是否可以使用 rust 提供的方法
     */
    __TAURI_INTERNALS__: unknown
}

interface ImportMetaEnv {
    /** 项目中文名 */
    readonly VITE_APP_NAME: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
