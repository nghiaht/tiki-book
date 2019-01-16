import {put, all, takeEvery} from 'redux-saga/effects'
import {Types, Creators} from "./index";

import {api} from "../../../services";

export function* loadBook({params}) {
    try {
        const {id} = params;
        yield put(Creators.start({id}));
        const response = yield api.book.getBook({id});
        yield put(Creators.succeed({
            item: response
        }))
    } catch (e) {
        yield(put(Creators.fail(new Error(e.message || "Failed to get book"))));
    }
}

export default function* saga() {
    yield all([
        takeEvery(Types.REQUEST, loadBook)
    ])
}