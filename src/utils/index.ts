/** 安全的执行 promise 或者方法 */
export async function executeSafely<T = unknown>(promise: Promise<T> | (() => T) | T) {
    return new Promise<T | null>((resolve) => {
        if (promise instanceof Promise) {
            let result: T | null = null
            promise
                .then((res) => {
                    result = res
                })
                .finally(() => {
                    resolve(result)
                })
        } else if (promise instanceof Function) {
            resolve(promise())
        } else {
            resolve(promise)
        }
    })
}
