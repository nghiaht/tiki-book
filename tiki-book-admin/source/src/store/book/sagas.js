import { all, fork } from "redux-saga/effects";
import listSaga from "./list/sagas";
import createSaga from "./create/sagas";
import detailSaga from "./detail/sagas";
import updateSaga from "./update/sagas";

export default function* saga() {
    yield all([
        fork(listSaga),
        fork(detailSaga),
        fork(createSaga),
        fork(updateSaga),
    ]);
}
