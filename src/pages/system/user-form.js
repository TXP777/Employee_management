import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class UserForm extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
  };
  state = {};
  onValuesChange = (values) => {
    this.setState(values);
  };
  addOrUpdateUser = () => {
    //collect data
    const user = this.state;
    // console.log(user);
    // update user
    return user;
  
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 }, 
      wrapperCol: { span: 10 }, 
    };
    const user = this.props.user
    // console.log()
    return (
      <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
        <Item
          label="UserId"
          name="user_id"
          rules={[{ required: true, message: "The user id must be enter!" }]}
          initialValue={user.user_id}
        >
          <Input placeholder="Please enter the username"></Input>
        </Item>
        <Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "The username must be enter!" }]}
          initialValue={user.username}
        >
          <Input placeholder="Please enter the username"></Input>
        </Item>
        <Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "The password must be enter!" }]}
            initialValue={user.password}
          >
            <Input type="password" placeholder="Please enter your password"></Input>
          </Item>
        
        <Item
          label="Employee_id"
          name="employee_id"
          rules={[{ required: true, message: "The employee_id must be enter!" }]}
          initialValue={user.employee_id}
        >
          <Input placeholder="Please enter your employee_id"></Input>
        </Item>
    
      </Form>
    );
  }
}