import {put, all, takeEvery} from 'redux-saga/effects'
import {Types, Creators} from "./index";

import {api} from "../../../services";

export function* loadBooks({params}) {
    try {
        const {limit, offset, order, loadMore} = params;
        yield put(Creators.start({limit, offset, order}));
        const response = yield api.book.getBooks({limit, offset, order});
        yield put(Creators.succeed({
            items: response,
            loadMore
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