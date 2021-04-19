import React, {Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header'; 

import Home from '../home/home';
import Attendance from '../attendance/attendance';
import Employee from '../employee/employee';
import System from '../system/system';


const { Footer, Sider, Content } = Layout;




export default class Admin extends Component{
    render(){
        return(
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
              <Header>Header</Header>
              <Content style={{margin:20, backgroundColor:'#fff'}}>
             
              <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/attendance' component={Attendance} />
                  <Route path='/employee' component={Employee} />
                  <Route path='/system' component={System} />

                  <Redirect to ='/home' />

              </Switch>
            
        
              
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        )
    }
}