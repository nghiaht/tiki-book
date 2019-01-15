import { combineReducers } from "redux";

import { reducer as listReducer } from "./list";
import { reducer as detailReducer } from "./detail";
import { reducer as createReducer } from "./create";
import { reducer as updateReducer } from "./update";



const bookReducer = combineReducers({
    list: listReducer,
    detail: detailReducer,
    create: createReducer,
    update: updateReducer,
});

export default bookReducer;