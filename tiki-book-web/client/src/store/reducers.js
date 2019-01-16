import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import  bookReducer from "./book";

const rootReducer = combineReducers({
    form: formReducer,
    book: bookReducer
});

export default rootReducer;
