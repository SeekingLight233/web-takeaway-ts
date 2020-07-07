import tabModel, { TabState } from "./tab";
import CateModel, { CateState } from "./category";
import ContentListModel, { ContentListState } from "./contentList";
import OrderListModel, { OrderListState } from "./order";

const models = [tabModel, CateModel, ContentListModel, OrderListModel]

export type RootState = {
    tab: TabState,
    cate: CateState,
    contentList: ContentListState,
    orderList: OrderListState
}

export default models