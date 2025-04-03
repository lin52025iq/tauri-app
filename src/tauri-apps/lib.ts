import { startDrag, Options } from '@crabnebula/tauri-plugin-drag'
import { canUseTauriApi } from './index'
import { resolveResource } from '@tauri-apps/api/path'

let IconImage: string = ''

async function loadIcon() {
    if (IconImage) {
        return
    }

    const path = await resolveResource('resources/images/drag-and-drop.png')
    IconImage = path
}

loadIcon()

/** 处理拖拽 */
export async function handleDrag(item: Options['item'], onEvent?: Parameters<typeof startDrag>[1]) {
    if (!canUseTauriApi) return

    await startDrag({
        item,
        icon: IconImage
    }, (result) => {
        console.log(result)
        if (typeof onEvent === 'function') {
            onEvent(result)
        }
    })
}
