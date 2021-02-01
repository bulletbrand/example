import {all} from "redux-saga/effects"
import {userWatcher} from "./authSaga";

export function* rootWatcher() {
    yield all([userWatcher()])
}