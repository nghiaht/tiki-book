import {put, all, takeEvery} from 'redux-saga/effects'
import {Types, Creators} from "./index";

import {api} from "../../../services";

export function* createBook({params}) {
    try {
        const {title, description, categories, cover} = params;
        yield put(Creators.start({title, description, categories, cover}));
        const response = yield api.book.createBook({title, description, categories, cover});
        yield put(Creators.succeed({
            item: response
        }))
    } catch (e) {
        yield(put(Creators.fail(new Error(e.message || "Failed to create book"))));
    }
}

export default function* saga() {
    yield all([
        takeEvery(Types.REQUEST, createBook)
    ])
}