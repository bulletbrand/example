export const LOG_IN = 'LOG_IN'
export const IS_AUTH = 'IS_AUTH'
export const SET_AUTH = 'SET_AUTH'


export const logInAction = (payload) => ({type: LOG_IN, payload})
export const asyncCheckAuthAction = (payload) => ({type: IS_AUTH, payload})
export const setAuth = payload => ({type: SET_AUTH, payload})