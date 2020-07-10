/**
 * @description 筛选框弹出层 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { resolveFilterData } from '../utils/homeUtils';
import { cloneDeep } from "lodash"


export interface IFilterItem {
    name: string,
    icon: string,
    active: boolean
}

export interface IFilter {
    isSupportMultiChoice: number,
    groupTitle: string,
    filterItemList: IFilterItem[]
}


export interface FilterListState {
    items: IFilter[],
    count: number
}

interface FilterListModel extends Model {
    namespace: 'filterList',
    state: FilterListState,
    reducers: {
        setState: Reducer<FilterListState>,
        setActive: Reducer<FilterListState>,
        clearActive: Reducer<FilterListState>
    },
    effects: {
        getFilterList: Effect
    }
}

const initState: FilterListState = {
    items: [],
    count: 0
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
            return { ...state, ...payload }
        },
        /**
         * @description 改变筛选tag的激活状态
         */
        setActive(state = initState, { payload }) {
            const { row, index } = payload
            const newState = cloneDeep(state)
            const filterItemList = newState.items[row].filterItemList;

            // 最后两行只能单选
            if (row >= 2) {
                if (filterItemList.every((val) => val.active === false)) {
                    newState.count++
                }
                for (const item of filterItemList) {
                    item.active = false
                }
                filterItemList[index].active = true
            } else {
                // 改变状态前先更新count,单选不用更新
                filterItemList[index].active === false ? newState.count++ : newState.count--;
                filterItemList[index].active = !filterItemList[index].active
            }
            return { ...newState }
        },
        /**
         * @description 清楚tag的激活态
         */
        clearActive(state = initState) {
            const newState = cloneDeep(state)
            for (const row of newState.items) {
                for (const item of row.filterItemList) {
                    item.active = false
                }
            }
            newState.count = 0
            return { ...newState }
        }
    },
    effects: {
        /**
         * @description 请求后端数据
         */
        *getFilterList({ payload }, { call, put }) {
            const { data } = yield call(fetchData)
            const fetchList = data.multifilterVOList;
            yield put({
                type: "setState",
                payload: {
                    items: resolveFilterData(fetchList)
                }
            })
        }
    }
}
export default FilterListModel