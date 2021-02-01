import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuthHook = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [ready, setReady] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const login = useCallback((info) => {
        setIsAuth(true)
        setUserInfo(info)
        localStorage.setItem(storageName, JSON.stringify({userInfo: info, isAuth: true}))
    }, [])


    const logout = useCallback(() => {
        setIsAuth(false)
        setUserInfo(null)
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear()
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.userInfo && data.isAuth) {
            login(data.userInfo)
        }
        setReady(true)
    }, [login])


    return {isAuth, login, logout, userInfo, ready}
}