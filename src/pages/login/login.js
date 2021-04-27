import React, {useContext, useState} from 'react';
import {Form,  Input, Button, Checkbox, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import logo  from '../../assets/images/logo.jpg';
import {AuthContext }from "../../context/authContext";
import { Redirect } from "react-router-dom";


const LoginPage = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const login = () => {
      context.authenticate(userName, password);
    };

    const onFinish = async () => {
     context.authenticate(userName,password)
    };
    // const validatePwd = (value) => {
    //   // //console.log(value)
    //   if (!value) {
    //     message.info("Wrong username or password!");
  
    //   } else {
    //     message.info("User login is successful!"); //验证通过
    //   }
    // };

    const { from } = props.location.state || { from: { pathname: "/" } };

    if (context.isAuthenticated === true) {
      return <Redirect to={from} />;
    }
   
        return(
            <div className="login">
                <header className="login-header">
                    <img src= {logo} alt="logo"/>
                    <h1>Enterprise Management System</h1>
                </header>
                <section className="login-content">
                  <h2>Login</h2>

                  <Form 
                    name="normal_login"
                    className="login-form" 
                    initialValues={{
                      remember: true,
                    }}  
                    onFinish={onFinish}
              
                  
                  >
                    <Form.Item 
                      name="username"
                      rules={[
                        {required: true, message: 'Please input your Username!',},
                        { min:2, message: 'User name at least two digits!',},
                        { max:12, message: 'User name up to 12 digits!',},
                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be in English, composed of numbers or underscores!',},
                      ]} 
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />}  onChange={e => {setUserName(e.target.value);}} placeholder="Username" />
                    </Form.Item>
                    <Form.Item 
                      name="password" 
                      rules={[
                        { required: true, message: 'Please input your Password!',},
                        { min:2, message: 'Password at least two digits!',},
                        { max:12, message: 'Password up to 12 digits!',},
                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Password must be in English, composed of numbers or underscores!',},
                        {
                         // validator: validatePwd,
                        },
                     
                      ]} 
                    >
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={e => {setPassword(e.target.value);}}
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
                      <Button type="primary" htmlType="submit" className="login-form-button" onCilck={login}>
                        Log in
                      </Button>
          
                    </Form.Item>
                  </Form>

                    
                </section>
            </div>
        )
    }
export default LoginPage;

