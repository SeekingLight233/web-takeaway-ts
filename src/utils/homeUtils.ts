import { Item } from "../Models/contentList"

export const ItemToNumber = (string_item: string) => {
    const res = string_item.replace(/[^0-9\.]/g, "")
    return string_item.includes("km") ? Number(res) * 1000 : Number(res)
}
/**
 * @description 将网络请求中的部分字段转为Number 方便接下来的排序操作
 */
export const ResolveListData = (Items: Array<Item>) => {
    let items = Items
    const ResolveList = items.map((item, index) => {
        item.distance = ItemToNumber(item.distance as string)
        item.deliveryTimeTip = ItemToNumber(item.deliveryTimeTip as string)
        item.monthSalesTip = ItemToNumber(item.monthSalesTip as string)
        return item
    })
    return ResolveList
}