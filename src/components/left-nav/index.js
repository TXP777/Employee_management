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
                  <Menu.Item key="3"><Link to ='./editEmployee'>New Employee</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<MailOutlined />} title="Attendance Management">
                  <Menu.Item key="4"><Link to='./attendance'>Attendance Information</Link></Menu.Item>
                  <Menu.Item key="5"><Link to='./editAttendance'>Edit Attendance</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<MailOutlined />} title="Message Board">
                  <Menu.Item key="6"><Link to ='/message'>Message Information</Link></Menu.Item>
                  <Menu.Item key="7"><Link to ='/editMessage'>Edit Information</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<MailOutlined />} title="System Management">
                  <Menu.Item key="8"><Link to ='/system'>System Information</Link></Menu.Item>
                  <Menu.Item key="9"><Link to ='/editAccount'>New Account</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </div>
         
        )
    }
}