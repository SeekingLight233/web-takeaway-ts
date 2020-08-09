/**
 * @description 筛选框弹出层 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import store from "./dva"
import { cloneDeep } from "lodash"

interface ILabel {
    content: string,
    isSelected: number
}

interface Picture {
    smallPicUrl: string
}

export interface IComment {
    userName: string,
    userPicUrl: string,
    commentTime: string,
    deliveryTime: string,
    content: string,
    praiseDish: string,
    pictures: Picture[],
    label: string,
}


export interface CommentListState {
    list: IComment[],
    commentLabels: ILabel[],
    loading: boolean
}

interface CommentListModel extends Model {
    namespace: 'commentList',
    state: CommentListState,
    reducers: {
        setState: Reducer<CommentListState>,
        setActive: Reducer<CommentListState>,
    },
    effects: {
        getCommentList: Effect
    }
}

const initState: CommentListState = {
    list: [],
    commentLabels: [],
    loading: false
}

/**
 * @description 模拟网络请求
 */
const fetchData = (flag: any): Promise<CommentListState> => {
    const commentState = store.getState().commentList

    flag = flag ? 1 : 2
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: CommentListState = await axios.get(`./data/comment${flag}.json`);
            resolve(res);
        }, 500);
    });
};


const CommentListModel: CommentListModel = {
    namespace: "commentList",
    state: initState,
    reducers: {
        setState(state = initState, { payload }): CommentListState {
            return { ...state, ...payload }
        },
        setActive(state = initState, { payload }): CommentListState {
            const { index, flag } = payload;

            const newCommentLabels = state.commentLabels.map((item, _index) => {
                if (index === _index) {
                    return {
                        ...item,
                        isSelected: 1
                    }
                } else {
                    return {
                        ...item,
                        isSelected: 0
                    }
                }
            })

            return { ...state, commentLabels: newCommentLabels, loading: true }
        },
    },
    effects: {
        *getCommentList({ payload }, { call, put }) {
            const { flag, init } = payload
            console.log("getCommentList");


            if (init) {
                const { data } = yield call(fetchData.bind(null, true))
                const { commentLabels, list } = data

                yield put({
                    type: "setState",
                    payload: {
                        list,
                        commentLabels,
                        loading: false
                    }
                })

            } else {
                const { data } = yield call(fetchData.bind(null, flag));
                const { commentLabels, list } = data
                yield put({
                    type: "setState",
                    payload: {
                        list,
                        loading: false
                    }
                })

            }



        }

    }
}
export default CommentListModel