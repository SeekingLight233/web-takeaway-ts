/**
 * @description 筛选框弹出层 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'


export interface IFilterItemList {
    name: string,
    icon: string
}

export interface IFilter {
    isSupportMultiChoice: number,
    groupTitle: string,
    filterItemList: IFilterItemList[]
}


export interface FilterListState {
    items: IFilter[]
}

interface FilterListModel extends Model {
    namespace: 'filterList',
    state: FilterListState,
    reducers: {
        setState: Reducer<FilterListState>
    },
    effects: {
        getFilterList: Effect
    }
}

const initState: FilterListState = {
    items: []
}

/**
 * @description 模拟网络请求
 */
const fetchData = (): Promise<Array<IFilter>> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: Array<IFilter> = await axios.get(`./data/filter.json`);
            resolve(res);
        }, 500);
    });
};


const FilterListModel: FilterListModel = {
    namespace: "filterList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): FilterListState {
            const { items } = state
            const newItems = payload.items
            return { items: newItems }
        }
    },
    effects: {
        /**
         * @description 请求后端数据
         */
        *getFilterList({ payload }, { call, put }) {
            const { data } = yield call(fetchData)
            const fetchList = data.multifilterVOList;
            console.log(fetchList);
            yield put({
                type: "setState",
                payload: {
                    items: fetchList
                }
            })

        }
    }
}
export default FilterListModel