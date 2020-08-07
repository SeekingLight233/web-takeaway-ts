/**
 * @description 筛选框弹出层 数据模型
 */
import { Effect, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { cloneDeep } from "lodash"

interface ILabel {
    content: string,
    isSelected: number
}

interface Picture {
    smallPicUrl: string
}

interface IComment {
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
    commentLabels: ILabel[]
}

interface CommentListModel extends Model {
    namespace: 'commentList',
    state: CommentListState,
    reducers: {
        setState: Reducer<CommentListState>,
    },
    effects: {
        getCommentList: Effect
    }
}

const initState: CommentListState = {
    list: [],
    commentLabels: []
}

/**
 * @description 模拟网络请求
 */
const fetchData = (): Promise<CommentListState> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const res: CommentListState = await axios.get(`./data/comment.json`);
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
    },
    effects: {
        *getCommentList({ payload }, { call, put }) {
            console.log("getCommentList");

            const { data } = yield call(fetchData)
            console.log(data);
            const { commentLabels, list } = data

            yield put({
                type: "setState",
                payload: {
                    commentLabels, list
                }
            })
        }

    }
}
export default CommentListModel