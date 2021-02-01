import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundry from 'components/error-boundry/error-boundry'
import store from 'redux/store'
import App from 'App'
import ConfigProvider from 'antd/lib/config-provider'
import enUS from 'antd/lib/locale/en_US'


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BrowserRouter>
        <ConfigProvider locale={enUS}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root'),
)
