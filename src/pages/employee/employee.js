import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';


export default class Employee extends Component{
    state={
        employees:[]
    }

    initColumn= () => {
        this.columns=[
            {
                title:'Employee Name',
                dataIndex:'name'
            },
            {
                title:'Creation time',
                dataIndex:'createtime'
            },
            {
                title:'Authorization time',
                dataIndex:'auth_time'
            },
            {
                title:'Authorizer',
                dataIndex:'auth'
            }
        ]
    }

    onRow= (employee) => {
        return {
            onClick: event =>{

            }
        }

    }
 
    render(){

        const title = (
            <span>
                <Button type='primary'>Create Employee</Button> &nbsp;&nbsp;
                <Button type='primary' disable>Set Employee Permissions</Button>
            </span>
        )
        return(
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={ 1}
                    columns={this.columns}
                    pagination={{defaultPageSize : 5}}
                    rowSelection={{type:'radio'}}
                    onRow
                />
            </Card>
            
         
        )
    }
}