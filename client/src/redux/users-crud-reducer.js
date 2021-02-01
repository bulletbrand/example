import {USER_ADD, USER_DELETE, EDIT_USER} from './actions/userCrudActions'

const initialState = {
    crudTableData: [{
        key: 0,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },]
}

export const userCrudReducer = (state = initialState, {type, payload = {}}) => {
    switch (type) {
        case USER_ADD:
            return {...state, crudTableData: [...state.crudTableData, payload]}

        case USER_DELETE:
            return {
                ...state, crudTableData: state.crudTableData.filter(el => el.key !== payload.key)
            }

        case EDIT_USER:

            return {
                ...state,
                crudTableData:
                    [
                        ...state.crudTableData.slice(0, payload.indexRow),
                        payload.newRow,
                        ...state.crudTableData.slice(payload.indexRow + 1)
                    ]
            }

        default:
            return state
    }
}


