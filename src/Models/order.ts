/**
 * @description 订单列表 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'


interface IProduct {
    productName: string,
    productCount: number
}

export interface IOrder {
    shopName: string,
    img: string,
    productList: IProduct[],
    orderTime: string,
    totalPrice: string,
}

export interface OrderListState {
    items: IOrder[]
}

interface OrderListModel extends Model {
    namespace: 'orderList',
    state: OrderListState,
    reducers: {
        setState: Reducer<OrderListState>
    },
    effects: {
        getOrderList: Effect
    }
}

const initState: OrderListState = {
    items: []
}

/**
 * @description 模拟网络请求
 */
const fetchData = (): Promise<Array<IOrder>> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: Array<IOrder> = await axios.get(`./data/orders.json`);
            resolve(res);
        }, 500);
    });
};


const OrderListModel: OrderListModel = {
    namespace: "orderList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): OrderListState {
            const { items } = state
            const newItems = payload.items
            return { items: items.concat(newItems) }
        }
    },
    effects: {
        /**
         * @description 请求后端数据
         */
        *getOrderList({ payload }, { call, put }) {
            const { data } = yield call(fetchData)
            const OrdersData = data.orderList
            console.log(OrdersData);

            yield put({
                type: "setState",
                payload: {
                    items: OrdersData
                }
            })

        }
    }
}
export default OrderListModel