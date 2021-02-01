import React, { useState, useContext } from 'react'
import 'antd/dist/antd.css'
import './Header.css'
import Dropdown from 'antd/lib/dropdown'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Button from 'antd/lib/button'

import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { setActiveHeaderLinkAction } from '../../redux/actions/commonActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { menuHeaderItems, menuHeaderProfileItems } from '../../utils/mocks'
import { Link } from 'react-router-dom'
import { toogleSliderMenuAction } from '../../redux/actions/commonActions'
import { AuthContext } from '../../context/authContext'

const { Header } = Layout

export default function HeaderComponent() {
  const auth = useContext(AuthContext)

  const [activeMenuTab, setActiveMenuTab] = useState('0')
  const [collapsed, setCollapsed] = useState(true)

  const dispatch = useDispatch()
  const history = useHistory()

  const signOutHandler = () => {
    auth.logout()
    history.push('/login')
  }

  const changeHeaderActiveTab = (path, indexCurrentTab) => {
    dispatch(setActiveHeaderLinkAction(path))
    return setActiveMenuTab(indexCurrentTab)
  }

  const menu = () => {
    const icon = 'Sign out' ? <UserOutlined /> : ''
    return (
      <Menu onClick={signOutHandler}>
        {menuHeaderProfileItems.map((item, index) => {
          return <Menu.Item key={index} icon={icon}>{item}</Menu.Item>
        })}
      </Menu>
    )
  }

  const toggleCollapsed = () => {
    setCollapsed((collapsed) => !collapsed)
    dispatch(toogleSliderMenuAction())
  }

  return (
    <Header className='header'>
      <Button onClick={toggleCollapsed} type='primary' className='btn'>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu className='header__menu' theme='dark' mode='horizontal' defaultSelectedKeys={[activeMenuTab]}>
        {menuHeaderItems.map((item, index) => {
          return <Menu.Item onClick={() => changeHeaderActiveTab(item.path, index)} className='item'
                            key={index}><Link
            to={item.path}>{item.name}</Link></Menu.Item>
        })}
      </Menu>
      <Dropdown.Button className='logout_tab' overlay={menu} placement='bottomCenter' icon={<UserOutlined />}>
        User
      </Dropdown.Button>
    </Header>
  )
}