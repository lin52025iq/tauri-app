export const isDark = useDark()

/** 切换暗黑主题 */
export const toggleDark = (event?: TouchEvent | MouseEvent) => {
    const isAppearanceTransition
        = 'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
        useToggle(isDark)()
        return
    }

    let x: number, y: number
    if (event instanceof TouchEvent) {
        x = event.touches[0].clientX
        y = event.touches[0].clientY
    } else if (event instanceof MouseEvent) {
        x = event.clientX
        y = event.clientY
    } else {
        // 如果没有事件对象，使用屏幕右上角作为默认位置
        x = window.innerWidth
        y = 0
    }
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(async () => {
        useToggle(isDark)()
        await nextTick()
    })

    transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        document.documentElement.animate(
            {
                clipPath: isDark.value ? [...clipPath].reverse() : clipPath
            },
            {
                duration: 400,
                easing: 'ease-out',
                pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
            }
        )
    })
}
