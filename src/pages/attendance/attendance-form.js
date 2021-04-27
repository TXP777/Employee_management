import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class AttendanceForm extends PureComponent {
  static propTypes = {

    attendance: PropTypes.object,
  };
  state = {};
  onValuesChange = (values) => {
    this.setState(values);
  };
  updateEmployee = () => {
    //collect data
    const attendance = this.state;
    //Update employees list display
    return attendance;

  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 }, //The width of the left label
      wrapperCol: { span: 10 }, //The width of the input box on the right side
    };
    const attendance = this.props.attendance
    return (
      <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
        <Item
          label="Employee_name"
          name="Employee_name"
          rules={[{ required: true, message: "The employee name must be entered!!" }]}
          initialValue={attendance.employee_name}
        >
          <Input placeholder="Please enter your name"></Input>
        </Item>
        {
            attendance.employee_id?null:<Item
            label="Employee_id"
            name="Employee_id"
            rules={[{ required: true, message: "The employee ID must be entered!!" }]}
            initialValue={attendance.employee_id}
          >
            <Input placeholder="Please enter your Id"></Input>
          </Item>
        }
        <Item
          label="Employee_phone"
          name="Employee_phone"
          rules={[{ required: true, message: "The employee's phone number must be entered!!" }]}
          initialValue={attendance.employee_phone}
        >
          <Input placeholder="Please enter your phone number"
          ></Input>
        </Item>
        <Item
          label="Employee_address"
          name="Employee_address"
          rules={[{ required: true, message: "The employee's address must be entered!!" }]}
          initialValue={attendance.employee_address}
        >
          <Input placeholder="Please enter your address"
          ></Input>
        </Item>
    
    
      </Form>
    );
  }
}