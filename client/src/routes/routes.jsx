import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainApp, LoginPage, RegisterPage } from '../pages'
import Layout from 'antd/lib/layout'

const { Footer } = Layout

export const authRoutes = (isAuth) => {

  if (isAuth) {
    return (
      <Switch>
        <Route path='/' component={MainApp} />
      </Switch>
    )
  }

  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage} exact />
        <Route path='/register' component={RegisterPage} exact />
        <Redirect to='/login' />
      </Switch>
      <Footer className='footer__simple'>Starter ©2021 Express&React&MySQL Dev</Footer>
    </>
  )
}