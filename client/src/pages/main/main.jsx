import React, {useEffect} from 'react'
import 'antd/dist/antd.css'
import './Main.css'
import Layout from 'antd/lib/layout'
import HeaderComponent from '../../components/header/header'
import SliderMenu from '../../components/slider-menu/slider-menu'
import BreadcrumbComponent from '../../components/breadcrumb/breadcrumb'
import HomePage from "../home/home";
import Managment from "../managment/managment";
import UsersDemo from "../users/users";
import NotFound from "../not-found/not-found"
import Customers from "../customers/customers"
import {Switch, Route, Redirect} from 'react-router-dom'
import {checkAuthAccess} from "../../utils/auth"

const {Content} = Layout;

export default function MainApp() {

    useEffect(() => {
        checkAuthAccess()
    })

    return (
        <Layout>
            <HeaderComponent/>
            <Layout>
                <SliderMenu/>
                <Layout className="content_layout">
                    <BreadcrumbComponent/>
                    <Content className="site-layout-background">
                        <Switch>
                                <Route path="/" component={HomePage} exact/>
                                <Route path="/managment" component={Managment}/>
                                <Route path="/users" component={UsersDemo}/>
                                <Route path="/customers" component={Customers}/>
                                <Route path="*" component={NotFound}/>
                                <Redirect to="/" from="/login"/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}