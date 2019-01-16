import {put, all, takeEvery} from 'redux-saga/effects'
import {Types, Creators} from "./index";

import {api} from "../../../services";

export function* updateBook({params}) {
    try {
        const {id, title, description, categories} = params;

        yield put(Creators.start({title, description, categories}));
        const response = yield api.book.updateBook({id, title, description, categories});
        yield put(Creators.succeed({
            item: response
        }))
    } catch (e) {
        yield(put(Creators.fail(new Error(e.message || "Failed to update book"))));
    }
}

export default function* saga() {
    yield all([
        takeEvery(Types.REQUEST, updateBook)
    ])
}