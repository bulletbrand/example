import React from 'react'
import { authRoutes } from './routes/routes'
import Layout from 'antd/lib/layout'
import { useAuthHook } from './hooks/auth-hook'
import { AuthContext } from './context/authContext'
import 'antd/dist/antd.css'
import Spin from 'antd/lib/spin'
import './App.css'


const App = () => {
  const { isAuth, login, logout, userInfo, ready } = useAuthHook()
  const isAuthenticated = !!isAuth
  const routes = authRoutes(isAuthenticated)
  const spinner = <div className='spinner'><Spin size='large' /></div>

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, userInfo }}>
      <div className='wrapper'>
        <Layout className='layout'>
          {!ready ? spinner : routes}
        </Layout>
      </div>
    </AuthContext.Provider>
  )
}

export default App