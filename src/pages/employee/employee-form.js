import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class EmployeeForm extends PureComponent {
  static propTypes = {

    employee: PropTypes.object,
  };
  state = {};
  onValuesChange = (values) => {
    this.setState(values);
  };
  addOrUpdateEmployee = () => {
    //collect data
    const employee = this.state;
    //Update employees list display
    return employee;

  };
  render() {
    const formItemLayout = {
      labelCol: { span: 10 }, //The width of the left label
      wrapperCol: { span: 15 }, //The width of the input box on the right side
    };
    const employee = this.props.employee
    return (
      <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
        {employee.employee_id?null:<Item
            label="Employee_id"
            name="employee_id"
            rules={[{ required: true, message: "The employee ID must be entered!!" }]}
            initialValue={employee.employee_id}
          >
            <Input placeholder="Please enter your Id"></Input>
        </Item>
        }
        <Item
          label="Employee_name"
          name="employee_name"
          rules={[{ required: true, message: "The employee name must be entered!!" }]}
          initialValue={employee.employee_name}
        >
          <Input placeholder="Please enter your name"></Input>
        </Item>
        <Item
          label="Employee_gender"
          name="employee_gender"
          rules={[{ required: true, message: "The employee's gender must be entered!!" }]}
          initialValue={employee.employee_gender}
        >
          <Input placeholder="Please enter your gender"></Input>
        </Item>
        <Item
          label="Employee_qualification"
          name="employee_qualification"
          rules={[{ required: true, message: "The employee's qualification must be entered!!" }]}
          initialValue={employee.employee_qualification}
        >
          <Input placeholder="Please enter your qualification"></Input>
        </Item>
        
        <Item
          label="Employee_phone"
          name="employee_phone"
          rules={[{ required: true, message: "The employee's phone number must be entered!!" }]}
          initialValue={employee.employee_phone}
        >
          <Input placeholder="Please enter your phone number"></Input>
        </Item>
        <Item
          label="Employee_address"
          name="employee_address"
          rules={[{ required: true, message: "The employee's address must be entered!!" }]}
          initialValue={employee.employee_address}
        >
          <Input placeholder="Please enter your address"
          ></Input>
        </Item>
    
    
      </Form>
    );
  }
}