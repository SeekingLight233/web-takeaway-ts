/**
 * @description 商家列表 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { ResolveListData } from '../utils/homeUtils'
import { cloneDeep } from "lodash"

interface Discount {
    info: string,
    iconUrl: string,
}
interface Recommend {
    icon: string,
    recommendReason: string
}

export interface Item {
    shopName: string,
    wmPoiScore: string | number,//评分
    monthSalesTip: string | number,//销量
    picUrl: string,
    deliveryType: number,
    deliveryTimeTip: string | number//配送速度
    minPriceTip: string,
    shippingFeeTip: string
    distance: string | number,//距离    
    averagePriceTip: string,
    discounts2?: Discount[] //折扣信息
    recommendInfo?: Recommend[]
}


export interface ContentListState {
    items: Item[]
}

interface ContentListModel extends Model {
    namespace: 'contentList',
    state: ContentListState,
    reducers: {
        setState: Reducer<ContentListState>
    },
    effects: {
        getContentList: Effect,
        getFastList: Effect,
        getRateList: Effect,
        getSalesList: Effect,
        getDistanceList: Effect
    }
}


const initState: ContentListState = {
    items: [],
}

/**
 * @description 延迟1s模拟网络请求
 */
const fetchData = (pageNum: number): Promise<Array<Item>> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: Array<Item> = await axios.get(`./data/list${pageNum}.json`);
            resolve(res);
        }, 1000);
    });
};

const ContentListModel: ContentListModel = {
    namespace: "contentList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): ContentListState {
            return { ...state, ...payload }
        }
    },
    effects: {
        /**
         * @description 请求后端数据
         */
        *getContentList({ payload }, { call, put, select }) {
            let { pageNum } = payload;
            /* 以下的请求只是简单的模拟啦～～
            *  真实的情况肯定是会用post请求把页码发到后端
            */
            if (pageNum > 1) pageNum = 1
            const { data } = yield call(fetchData, pageNum)
            const contentListData = data.shopList
            const resolveListData = ResolveListData(contentListData)
            // 拼接原数据
            const state = yield select(state => state)
            const originItem: Item[] = state.contentList.items;

            yield put({
                type: "setState",
                payload: {
                    items: originItem.concat(resolveListData)
                }
            })
        },
        // 这里没有合并逻辑主要是为了模拟业务场景，想合并的话可以通过payload传个type过来
        /**
         * @description 速度最快
         */
        *getFastList({ _ }, { call, put, select }) {
            const state = yield select(state => state)
            const originItem = state.contentList.items;
            const newItem = cloneDeep(originItem)
            newItem.sort((a, b) => {
                return a.deliveryTimeTip - b.deliveryTimeTip
            })
            yield put({
                type: "setState",
                payload: {
                    items: newItem
                }
            })
        },
        /**
         * @description 评分最好
         */
        *getRateList({ _ }, { call, put, select }) {
            const state = yield select(state => state)
            const originItem = state.contentList.items;
            const newItem = cloneDeep(originItem)
            newItem.sort((a, b) => {
                return b.wmPoiScore - a.wmPoiScore
            })
            yield put({
                type: "setState",
                payload: {
                    items: newItem
                }
            })
        },
        /**
         * @description 销量最高
         */
        *getSalesList({ _ }, { call, put, select }) {
            const state = yield select(state => state)
            const originItem = state.contentList.items;
            const newItem = cloneDeep(originItem)
            newItem.sort((a, b) => {
                return b.monthSalesTip - a.monthSalesTip
            })
            yield put({
                type: "setState",
                payload: {
                    items: newItem
                }
            })
        },
        /**
         * @description 距离最近
         */
        *getDistanceList({ _ }, { call, put, select }) {
            const state = yield select(state => state)
            const originItem = state.contentList.items;
            const newItem = cloneDeep(originItem)
            newItem.sort((a, b) => {
                return a.distance - b.distance
            })
            yield put({
                type: "setState",
                payload: {
                    items: newItem
                }
            })
        }
    }
}
export default ContentListModel