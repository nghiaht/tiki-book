import { combineReducers } from "redux";

import { reducer as listReducer } from "./list";
import { reducer as detailReducer } from "./detail";
import { reducer as createReducer } from "./create";
import { reducer as updateReducer } from "./update";
import { reducer as deleteReducer } from "./delete";

const bookReducer = combineReducers({
    list: listReducer,
    detail: detailReducer,
    create: createReducer,
    update: updateReducer,
    delete: deleteReducer,
});

export default bookReducer;