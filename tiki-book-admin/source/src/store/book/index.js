import { reducer as listReducer } from "./list";

import { combineReducers } from "redux";

const bookReducer = combineReducers({
    list: listReducer,
    // detail: detailReducer,
    // register: registerReducer,
});

export default bookReducer;