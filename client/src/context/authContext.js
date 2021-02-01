import {createContext} from 'react'


export const AuthContext = createContext({
    userInfo: null,
    login: () => {
    },
    logout: () => {
    },
    isAuth: false
})