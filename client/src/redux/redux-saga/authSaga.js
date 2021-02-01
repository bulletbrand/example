import {put, takeEvery, call} from "redux-saga/effects"
import {IS_AUTH, setAuth} from "../actions/authActions";
import {asyncRequest} from '../../utils/auth'



function* checkAuthIsValidWorker({payload}) {
    const data = yield call(() => asyncRequest(payload))
    yield put(setAuth(data))
}

export function* userWatcher() {
    yield takeEvery(IS_AUTH, checkAuthIsValidWorker)
}