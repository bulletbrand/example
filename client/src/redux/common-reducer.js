import {TOOGLE_SLIDER_MENU} from "./actions/commonActions";
import {ACTIVE_HEADER_LINK} from "./actions/commonActions";


const initialState = {
    isSliderMenuOpen: true,
    currentPath: '/'
}

export const commonReducer = (state = initialState, {type, payload = {}}) => {
    switch (type) {
        case TOOGLE_SLIDER_MENU:
            return {
                isSliderMenuOpen: !state.isSliderMenuOpen
            }
        case ACTIVE_HEADER_LINK:

            return {
                ...state,
                currentPath: payload
            }
        default:
            return state
    }
}


