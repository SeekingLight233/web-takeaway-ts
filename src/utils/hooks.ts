import { useEffect, useState } from 'react'
import { throttle } from 'lodash';


/**
 * @description 根据滚动高度设置外部状态
 */
export const useScroll = (setState: React.Dispatch<React.SetStateAction<boolean>>, height: number): void => {
    const stickTop = () => {
        const scrollHeight = document.documentElement.scrollTop;
        if (scrollHeight > height) {
            setState(_ => true);
        } else {
            setState(_ => false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', throttle(stickTop, 200));
        return () => {
            window.removeEventListener('scroll', stickTop);
        };
    }, []);
}

