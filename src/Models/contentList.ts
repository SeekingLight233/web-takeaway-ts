import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { ResolveListData } from '../utils/homeUtils'

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
        getContentList: Effect
    }
}

const initState: ContentListState = {
    items: [],
}

const ContentListModel: ContentListModel = {
    namespace: "contentList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): ContentListState {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getContentList(_, { call, put }) {
            const { data } = yield call(axios.get, "./data/list.json")
            const contentListData = data.shopList
            const resolveListData = ResolveListData(contentListData)
            console.log(resolveListData);

            yield put({
                type: "setState",
                payload: {
                    items: resolveListData
                }
            })
        }
    }
}
export default ContentListModel