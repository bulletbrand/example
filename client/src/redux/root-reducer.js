import {combineReducers} from 'redux'
import {authReducer} from './auth-reducer'
import {commonReducer} from './common-reducer'
import {userCrudReducer} from "./users-crud-reducer";

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

const appReducer = combineReducers({
    auth: authReducer,
    common: commonReducer,
    userCrud: userCrudReducer
});


export default rootReducer;
