import React, {useEffect} from 'react'
import Form from 'antd/lib/form'
import notification from 'antd/lib/notification'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons'
import {validatePassword, validateEmail} from '../../utils/validation-ant-utils'
import API from '../../services/api-service'
import antNotificationComponent from '../../utils/notification-ant-utils'


const RegisterPage = () => {
    const history = useHistory();

    useEffect(() => {
        notification.destroy()
    });

    const onFinish = async ({name, email, password}) => {
        await API.post('auth/registration', {name, email, password})
        antNotificationComponent({
            description: 'You have been successfully registered'
        })
        setTimeout(() => history.push('/login'), 3000)
    };

    return (
        <div className="login__form block">
            <div className="container-fluid-sm">
                <h1>Register</h1>
                <Form
                    name="normal_login"
                    className="register-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please input your Username!'}]}>
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        validateTrigger={['onBlur']}
                        rules={[{required: true, message: 'Please input your Email!'}, {validator: validateEmail}]}>
                        <Input size="large" prefix={<MailOutlined className="site-form-item-icon"/>}
                               placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateTrigger={['onBlur']}
                        rules={[{
                            required: true,
                            message: 'Please input your Password!'
                        }, {validator: validatePassword}]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"/>
                    </Form.Item>
                    <Form.Item
                        name="repeatPassword"
                        validateTrigger={['onBlur']}
                        rules={[{
                            required: true,
                            message: 'Please repeat your password!'
                        }, {validator: validatePassword}]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Repeat password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login__form-button">
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item><h3>Already have account?</h3><Link to="/login">Back to login</Link></Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage