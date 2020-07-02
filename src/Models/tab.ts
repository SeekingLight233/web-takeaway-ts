import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'

export interface ITab {
    name: string,
    key: string
}

export interface TabState {
    tabs: ITab[],
    activeKey: string
}

interface TabModel extends Model {
    namespace: 'tab',
    state: TabState,
    reducers: {
        changeTab: Reducer<TabState>
    }
}

const initState: TabState = {
    tabs: [
        { name: "首页", key: "home" },
        { name: "订单", key: "order" },
        { name: "我的", key: "my" }
    ],
    activeKey: "home"
}

const tabModel: TabModel = {
    namespace: 'tab',
    state: initState,
    reducers: {
        changeTab(state = initState, { payload }) {
            // let activeKey = payload.activeKey
            return { ...state, ...payload }
        }
    }
}

export default tabModel