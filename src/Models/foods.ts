/**
 * @description 筛选框弹出层 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { cloneDeep } from "lodash"

export interface Activity {
    actDesc: string,
    iconUrl: string
}

interface ShopInfo {
    shopName: string,
    shopPic: string,
    deliveryTimeDecoded: string,
    distance: string,
    shopAddress: string,
    shipping_time: string,
    bulletin: string,
    minFee: number,
    activityList: Activity[]
}

interface Sku {
    skuPromotionInfo: string
}

export interface Spu {
    spuName: string,
    activityTag: string,
    littleImageUrl: string,
    bigImageUrl: string,
    originPrice: number,
    currentPrice: number,
    sellStatus: number,
    spuDesc: string,
    saleVolumeDecoded: string,
    saleVolume: number,
    praiseNumDecoded: string,
    skuList: Sku[],
    spuId?: number
}

interface Category {
    activityTag: string,
    iconUrl: string,
    categoryName: string,
    spuList: Spu[],
    spuPromotionInfo: string,
    tag?: string,
    cateTotal: number,
}

export interface FoodListState {
    shopInfo: ShopInfo
    categoryList: Category[],
    activeLeftTag: string,
    totalPrice: number,
    totalOriginPrice: number,
    totalAmount: number
}

interface FoodListModel extends Model {
    namespace: 'foodList',
    state: FoodListState,
    reducers: {
        setState: Reducer<FoodListState>,
        setActive: Reducer<FoodListState>,
        setSellState: Reducer<FoodListState>,
    },
    effects: {
        getFoodList: Effect
    }
}

const initState: FoodListState = {
    shopInfo: {
        shopName: "",
        shopPic: "",
        deliveryTimeDecoded: "",
        distance: "",
        shopAddress: "",
        shipping_time: "",
        bulletin: "",
        activityList: [],
        minFee: 0
    },
    categoryList: [],
    activeLeftTag: "",
    totalPrice: 0,
    totalOriginPrice: 0,
    totalAmount: 0,
}

/**
 * @description 模拟网络请求
 */
const fetchData = (): Promise<FoodListState> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: FoodListState = await axios.get(`./data/food.json`);
            resolve(res);
        }, 500);
    });
};


const FoodListModel: FoodListModel = {
    namespace: "foodList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): FoodListState {
            return { ...state, ...payload }
        },
        setActive(state = initState, { payload }) {
            // const { activeLeftTag } = payload
            return { ...state, activeLeftTag: payload }
        },
        /**
         * @description 更新商品的购买数量（计数器）
         */
        setSellState(state = initState, { payload }) {

            const spu: Spu = payload.spu;
            const { sellStatus, originPrice, currentPrice } = spu

            const cateTag = payload.tag
            let { totalAmount, totalPrice, totalOriginPrice } = state;


            const newCategoryList = state.categoryList.map((category) => {
                const { spuList } = category
                let cateTotal = category.cateTotal;
                if (cateTotal == null) {
                    cateTotal = 0
                }

                const newSpuList = spuList.map((originSpu) => {
                    // 我佛了spuId竟然是不唯一的,这里利用外部的category tag生成唯一索引
                    const originID = originSpu.spuId.toString() + category.tag;
                    const newID = spu.spuId.toString() + cateTag

                    if (originID === newID) {
                        // 更新totalAmount
                        if (originSpu.sellStatus < spu.sellStatus) {
                            totalAmount = totalAmount + 1;
                            totalPrice = totalPrice + currentPrice
                            totalOriginPrice = totalOriginPrice + originPrice;
                            cateTotal++;
                        }
                        if (originSpu.sellStatus >= spu.sellStatus) {
                            totalAmount = totalAmount - 1;
                            totalPrice = totalPrice - currentPrice
                            totalOriginPrice = totalOriginPrice - originPrice;
                            cateTotal--;
                        }
                        return spu
                    } else {
                        return originSpu
                    }
                })
                return { ...category, spuList: newSpuList, cateTotal }
            })


            return {
                ...state,
                categoryList: newCategoryList,
                totalAmount,
                totalPrice: Number(totalPrice.toFixed(1)),
                totalOriginPrice: Number(totalOriginPrice.toFixed(1))
            }
        }
    },
    effects: {
        /**
         * @description 请求后端数据
         */
        *getFoodList({ payload }, { call, put }) {
            const { data } = yield call(fetchData)
            const { categoryList, shopInfo } = data
            yield put({
                type: "setState",
                payload: {
                    shopInfo,
                    categoryList,
                    // 请求到事物列表后设置默认activeLeftTag
                    activeLeftTag: categoryList[0].categoryName
                }
            })
        }
    }
}
export default FoodListModel