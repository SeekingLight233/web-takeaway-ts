import tabModel, { TabState } from "./tab";
import CateModel, { CateState } from "./category";

const models = [tabModel, CateModel]

export type RootState = {
    tab: TabState,
    cate: CateState
}

export default models