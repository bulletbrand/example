export const USER_ADD = 'USER_ADD'
export const USER_DELETE = 'USER_DELETE'
export const EDIT_USER = 'EDIT_USER'


export const userCrudDeleteAction = (payload) => {
    return ({type: USER_DELETE, payload})
}

export const userCrudAddAction = (payload) => {
    return ({type: USER_ADD, payload})
}

export const userCrudEditAction = (payload) => {
    return ({type: EDIT_USER, payload})
}