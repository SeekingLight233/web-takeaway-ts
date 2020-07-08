import tabModel, { TabState } from "./tab";
import CateModel, { CateState } from "./category";
import ContentListModel, { ContentListState } from "./contentList";
import OrderListModel, { OrderListState } from "./order";
import FilterListModel, { FilterListState } from "./filter";

const models = [tabModel, CateModel, ContentListModel, OrderListModel, FilterListModel]

export type RootState = {
    tab: TabState,
    cate: CateState,
    contentList: ContentListState,
    orderList: OrderListState,
    filterList: FilterListState
}

export default models