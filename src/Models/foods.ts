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
    praiseNumDecoded: string
    skuList: Sku[]
}

interface Category {
    activityTag: string,
    iconUrl: string,
    categoryName: string,
    spuList: Spu[],
    spuPromotionInfo: string,
}

export interface FoodListState {
    shopInfo: ShopInfo
    categoryList: Category[],
    activeLeftTag: string,
    totalPrice: number
}

interface FoodListModel extends Model {
    namespace: 'foodList',
    state: FoodListState,
    reducers: {
        setState: Reducer<FoodListState>,
        setActive: Reducer<FoodListState>,
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
    totalPrice: 9
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
            console.log(payload);
            return { ...state, activeLeftTag: payload }
        },
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