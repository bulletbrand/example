import React, {useEffect,useContext} from "react"
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import 'antd/dist/antd.css'
import './Login.css'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom';
import antNotificationComponent from '../../utils/notification-ant-utils'
import {validatePassword} from '../../utils/validation-ant-utils'
import API from '../../services/api-service'
import {AuthContext} from '../../context/authContext'


const LoginPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        antNotificationComponent({
            type: "info",
            description: 'Now you can input your credentials and log in or register in app'
        })
    });

    const onFinish = async (userData) => {
        const data = await API.post("auth/login", {name: userData.name, password: userData.password})
        auth.login(data.userInfo)
        history.push("/")
    };

    return (
        <div className="login__form block">
            <div className="container-fluid-sm">
                <h1>Log in</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please input your Username!'}]}>
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateTrigger={['onBlur']}
                        rules={[{required: true, message: 'Please input your Password!'},
                            {validator: validatePassword}]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link to="/forgot">Forgot password</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login__form-button">
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage