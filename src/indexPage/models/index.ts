import tabModel, { TabState } from "./tab";

const models = [tabModel]

export type RootState = {
    tab: TabState
}

export default models