import React from 'react'
import 'antd/dist/antd.css'
import './Slider-menu.css'
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import {UserOutlined} from "@ant-design/icons";
import {subnavMenuItems} from '../../utils/mocks'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

const {SubMenu} = Menu
const {Sider} = Layout

export default function SliderMenu(props) {
    const activeLink = useSelector((state) => state.common.currentPath)
    const isSliderOpen = useSelector((state) => state.common.isSliderMenuOpen)


    return (

        <Sider width={isSliderOpen ? 180 : 0} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['0']}
                style={{height: '100%', borderRight: 0}}>
                {subnavMenuItems.map((item, index) => {
                    return <SubMenu key={index} icon={<UserOutlined/>} title={item.title}>
                        {item.items.map((childItem, childItemIndex) => {
                            return <Menu.Item key={item.title+ childItemIndex}>
                                {activeLink === '/' ?
                                    <Link to={`${activeLink}${childItem.path}`}>{childItem.name}</Link> :
                                    <Link to={`${activeLink}/${childItem.path}`}>{childItem.name}</Link>
                                }
                            </Menu.Item>
                        })}
                    </SubMenu>
                })}
            </Menu>
        </Sider>
    )
}