import { useEffect, useState } from 'react'


/**
 * @description 根据interval定期调用callback
 */
export const useInterval = (callback, interval: number) => {
    useEffect(() => {
        const start = new Date().getTime()
        const I = setInterval(() => {
            callback(new Date().getTime() - start)
        }, interval)
        return () => clearInterval(I)
    }, [])
}
/**
 * @description 实现silder逻辑
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSlider = (N, speed = 2000) => {
    const [slider, setSlider] = useState(0)
    useInterval((diff) => {
        setSlider(_ => Math.floor(diff / speed) % N)
    }, 2000)
    return slider
}