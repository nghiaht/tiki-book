import { all, fork } from "redux-saga/effects";
import listSaga from "./list/sagas";

export default function* saga() {
    yield all([fork(listSaga)]);
}
