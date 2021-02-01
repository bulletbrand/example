import {LOG_IN, SET_AUTH} from "./actions/authActions";


const initialState = {
    token: false,
    user: {}
}

export const authReducer = (state = initialState, {type, payload = {}}) => {
    switch (type) {

        case LOG_IN:
            return {
                ...state,
                token: payload.token,
                user: payload.userInfo
            }

        case SET_AUTH: {
            return {
                ...state,
                token: payload.status,//we save and use token from cookie storage so here it just status we need
            }
        }

        default:
            return state
    }
}


