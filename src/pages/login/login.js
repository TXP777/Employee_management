import React, {Component} from 'react';
import {Form,  Input, Button, Checkbox, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import logo  from '../../assets/images/logo.jpg';



export default class Login extends Component {
  onFinish = (values) => {
    console.log('Submit the login ajax request', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Verification failed!',errorInfo);
  };
 


    render(){
   
        return(
            <div className="login">
                <header className="login-header">
                    <img src= {logo} alt="logo"/>
                    <h1>Enterprise Management System</h1>
                </header>
                <section className="login-content">
                  <h2>User Login</h2>

                  <Form 
                    name="normal_login"
                    className="login-form" 
                    initialValues={{
                      remember: true,
                    }}  
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                  
                  >
                    <Form.Item 
                      name="username"
                      rules={[
                        {required: true, message: 'Please input your Username!',},
                        { min:4, message: 'User name at least four digits!',},
                        { max:12, message: 'User name up to 12 digits!',},
                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be in English, composed of numbers or underscores!',},
                      ]} 
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item 
                      name="password" 
                      rules={[
                        { required: true, message: 'Please input your Password!',},
                        { min:4, message: 'User name at least four digits!',},
                        { max:12, message: 'User name up to 12 digits!',},
                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be in English, composed of numbers or underscores!',},
                     
                      ]} 
                    >
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                      /> 
                    </Form.Item>

                    <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                      <a className="login-form-forgot" href="true">
                        Forgot password
                      </a>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                      </Button>
                      <a href="true">register now!</a>
                    </Form.Item>
                  </Form>

                    
                </section>
            </div>
        )
           }
}

