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
      labelCol: { span: 6 }, //The width of the left label
      wrapperCol: { span: 10 }, //The width of the input box on the right side
    };
    const employee = this.props.employee
    return (
      <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
        <Item
          label="Employee_name"
          name="Employee_name"
          rules={[{ required: true, message: "The employee name must be entered!!" }]}
          initialValue={employee.employee_name}
        >
          <Input placeholder="Please enter your name"></Input>
        </Item>
      
        {
            employee.employee_id?null:<Item
            label="Employee_id"
            name="Employee_id"
            rules={[{ required: true, message: "The employee ID must be entered!!" }]}
            initialValue={employee.employee_id}
          >
            <Input placeholder="Please enter your Id"></Input>
          </Item>
        }
        <Item
          label="Employee_gender"
          name="Employee_gender"
          rules={[{ required: true, message: "The employee's gender must be entered!!" }]}
          initialValue={employee.employee_gender}
        >
          <Input placeholder="Please enter your gender"></Input>
        </Item>
        <Item
          label="Employee_phone"
          name="Employee_phone"
          rules={[{ required: true, message: "The employee's phone number must be entered!!" }]}
          initialValue={employee.employee_phone}
        >
          <Input placeholder="Please enter your phone number"></Input>
        </Item>
        <Item
          label="Employee_address"
          name="Employee_address"
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