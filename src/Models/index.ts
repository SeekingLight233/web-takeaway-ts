import tabModel, { TabState } from "./tab";
import CateModel, { CateState } from "./category";
import ContentListModel, { ContentListState } from "./contentList";

const models = [tabModel, CateModel, ContentListModel]

export type RootState = {
    tab: TabState,
    cate: CateState,
    contentList: ContentListState
}

export default models