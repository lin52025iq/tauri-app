import { startDrag, Options } from '@crabnebula/tauri-plugin-drag'
import { canUseTauriApi } from './index'
import { resolveResource } from '@tauri-apps/api/path'

let IconImage: string = ''

/** 加载托拽的图标 */
export async function loadIcon() {
    if (IconImage || !canUseTauriApi) {
        return
    }

    const path = await resolveResource('resources/images/drag-and-drop.png')
    IconImage = path
}

/** 处理拖拽 */
export async function handleDrag(item: Options['item'], onEvent?: Parameters<typeof startDrag>[1]) {
    if (!canUseTauriApi) return

    await loadIcon()

    await startDrag({
        item,
        icon: IconImage
    }, (result) => {
        if (typeof onEvent === 'function') {
            onEvent(result)
        }
    })
}
