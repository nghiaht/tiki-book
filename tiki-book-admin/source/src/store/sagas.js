import {all, fork} from "redux-saga/effects";
import bookSaga from "./book/sagas";

export default function* createRootSaga() {
    yield all([
        fork(bookSaga),
    ]);
}
