import tabModel, { TabState } from "./tab";
import CateModel, { CateState } from "./category";
import ContentListModel, { ContentListState } from "./contentList";
import OrderListModel, { OrderListState } from "./order";
import FilterListModel, { FilterListState } from "./filter";
import FoodListModel, { FoodListState } from './foods';
import CommentListModel, { CommentListState } from './comment';

const models = [tabModel, CateModel, ContentListModel, OrderListModel, FilterListModel, FoodListModel, CommentListModel]

export type RootState = {
    tab: TabState,
    cate: CateState,
    contentList: ContentListState,
    orderList: OrderListState,
    filterList: FilterListState,
    foodList: FoodListState,
    commentList: CommentListState
}

export default models