import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'

interface Item {
    icon: string,
    name: string
}


export interface CateState {
    items: Item[]
}

interface CateModel extends Model {
    namespace: 'cate',
    state: CateState,
    reducers: {
        setState: Reducer<CateState>
    },
    effects: {
        getCateList: Effect
    }
}

const initState: CateState = {
    items: [{
        icon: "",
        name: ""
    }],
}

const CateModel: CateModel = {
    namespace: "cate",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): CateState {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getCateList(_, { call, put }) {
            const { data } = yield call(axios.get, "./data/head.json")
            const cateData = data.kingkongList.slice(0, 10)
            yield put({
                type: "setState",
                payload: {
                    items: cateData
                }
            })
        }
    }
}
export default CateModel