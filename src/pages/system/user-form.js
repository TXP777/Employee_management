import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class UserForm extends PureComponent {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    user: PropTypes.object,
  };
  state = {};
  onValuesChange = (values) => {
    this.setState(values);
  };
  updateUser = () => {
    //收集数据
    const user = this.state;
    // console.log(user);
    //   2.提交添加的请求
    return user;
    // 3.更新列表显示
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 }, //左侧label宽度
      wrapperCol: { span: 10 }, //右侧包裹输入框宽度
    };
    const user = this.props.user
    // console.log(roles)
    return (
      <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
        <Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "用户名必须输入!" }]}
          initialValue={user.username}
        >
          <Input placeholder="请输入用户名"></Input>
        </Item>
        {
            user._id?null:<Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "密码必须输入!" }]}
            initialValue={user.password}
          >
            <Input type="password" placeholder="请输入密码"></Input>
          </Item>
        }
        
        <Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: "手机号必须输入!" }]}
          initialValue={user.phone}
        >
          <Input
            //   type='password'
            placeholder="请输入手机号"
          ></Input>
        </Item>
        <Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: "邮箱必须输入!" }]}
          initialValue={user.email}
        >
          <Input
            //   type='password'
            placeholder="请输入邮箱"
          ></Input>
        </Item>
    
      </Form>
    );
  }
}