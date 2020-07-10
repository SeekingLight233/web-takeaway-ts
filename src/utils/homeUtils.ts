import { Item } from "../Models/contentList"
import { IFilter } from "../Models/filter"
import { cloneDeep } from 'lodash'

export const itemToNumber = (string_item: string): number => {
    const res = string_item.replace(/[^0-9\.]/g, "")
    return string_item.includes("km") ? Number(res) * 1000 : Number(res)
}
/**
 * @description 将网络请求中的部分字段转为Number 方便接下来的排序操作
 */
export const resolveListData = (items: Item[]): Item[] => {
    const resolveList = items.map((item) => {
        item.distance = itemToNumber(item.distance as string)
        item.deliveryTimeTip = itemToNumber(item.deliveryTimeTip as string)
        item.monthSalesTip = itemToNumber(item.monthSalesTip as string)
        return item
    })
    return resolveList
}

/**
 * @description 为每一个过滤标签添加一个active字段，用于记录点击状态
 */
export const resolveFilterData = (items: IFilter[]): IFilter[] => {
    const resolveItems = cloneDeep(items);
    for (const filter of resolveItems) {
        for (const filterItem of filter.filterItemList) {
            filterItem.active = false
        }
    }
    return resolveItems
}
/**
 * @description 手动封装防抖函数
 */
export const debounce = (fn, delay: number) => {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            // eslint-disable-next-line prefer-rest-params
            fn.apply(this, arguments)
        }, delay);
    }
}

export const scrollTop = (): void => {
    document.documentElement.scrollTop = 195;
}