import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.jpg';
import { Menu } from 'antd';
import {
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class LeftNav extends Component{
    render(){
        return( 
            <div className="left-nav">
              <Link to='/' className="left-nav-header">
                  <img src={logo} alt="logo"/>
                  <h1>Enterprise Management System</h1>
              </Link>

            
              <Menu mode="inline" theme="dark" >
                <Menu.Item key="1" icon={<MailOutlined />}>
                  <Link to='/home'>Home</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Employee Management">
                  <Menu.Item key="2"><Link to ='./employee'>Employee Information</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<MailOutlined />} title="Attendance Management">
                  <Menu.Item key="3"><Link to='./attendance'>Attendance Information</Link></Menu.Item>
                 
                </SubMenu>
              
                <SubMenu key="sub3" icon={<MailOutlined />} title="System Management">
                  <Menu.Item key="4"><Link to ='/system'>System Information</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </div>
         
        )
    }
}