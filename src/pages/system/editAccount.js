import React, {Component} from 'react';
import {
    Card,
    Button,
    Table
} from 'antd'


export default class EditAccount extends Component{
    state ={
        account:[]
    }

    initColumn =() =>{
        this.columns=[
            {
              title: 'account id',
              dataIndex:'  '
            },
            {
              title: 'Creation time',
              dataIndex:'  '
            },
            {
              title: 'authorizer',
              dataIndex:'  '
            },
            {
              title: 'Authorization time',
              dataIndex:'  '
            },
    ]
    }
    render(){
        
        const title = (
            <span>
                <Button type='primary'>create account</Button> &nbsp;
                <Button type='primary' disabled>Create role permissions</Button>
            </span>
        )
        return(
          <Card title={title}>
              <Table
              bordered
              rowKey='_id'
            
              columns={this.columns}
              pagination={{defaultPageSize: 5} } 
              />
          </Card>
            
            
            
         
        )
    }
}