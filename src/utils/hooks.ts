import { useEffect, useState } from 'react'


/**
 * @description 根据滚动高度设置外部状态
 */
export const useScroll = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, height: number): void => {
    const stickTop = () => {
        const scrollHeight = document.documentElement.scrollTop;
        if (scrollHeight > height && state === false) {// 如果不加上后面的条件会造成很大的性能开销  
            setState((state) => true);
        } else {
            setState((state) => false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', stickTop);
        return () => {
            window.removeEventListener('scroll', stickTop);
        };
    }, []);
}

