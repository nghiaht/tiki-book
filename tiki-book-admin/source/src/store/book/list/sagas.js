import {put, all, takeEvery} from 'redux-saga/effects'
import {Types, Creators} from "./index";

import {api} from "../../../services";

export function* loadBooks({params}) {
    try {
        const {limit, offset} = params;
        yield put(Creators.start({limit, offset}));
        const response = yield api.book.getBooks({limit, offset});
        yield put(Creators.succeed({
            items: response
        }))
    } catch (e) {
        yield(put(Creators.fail(new Error(e.message || "Failed to get books"))));
    }
}

export default function* saga() {
    yield all([
        takeEvery(Types.REQUEST, loadBooks)
    ])
}