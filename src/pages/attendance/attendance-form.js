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
  addAttendance = () => {
    //collect data
    const attendance = this.state;
    //Update list display
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
            label="Attendance_id"
            name="attendance_id"
            rules={[{ required: true, message: "The Attendance ID must be entered!!" }]}
            initialValue={attendance.attendance_id}
          >
            <Input placeholder="Please enter your attendance_id"></Input>
          </Item>
        <Item
          label="Employee_id"
          name="employee_id"
          rules={[{ required: true, message: "The employee's id must be entered!!" }]}
          initialValue={attendance.employee_id}
        >
          <Input placeholder="Please enter your id"></Input>
        </Item>
        
          <Item
            label='Employee_name'
            name='employee_name'
            rules={[{ required: true, message: "The employee name must be entered!!" }]}
            initialValue={attendance.employee_name}
          >
            <Input placeholder="Please enter your name"></Input>
          </Item>
        
        <Item
          label='Department_id'
          name='department_id'
          rules={[{ required: true, message: "The employee's department id number must be entered!!" }]}
          initialValue={attendance.department_id}
        >
          <Input placeholder="Please enter your department id"></Input>
        </Item>
        <Item
          label="Working Time"
          name="workingtime"
          rules={[{ required: true, message: "The working Time must be entered!!" }]}
          initialValue={attendance.workingtime}
        >
          <Input placeholder="Please enter working Time"
          ></Input>
        </Item>
        <Item
          label="Number of late and leave early"
          name="numberoflateandleaveearly"
          rules={[{ required: true, message: "This recording must be entered!!" }]}
          initialValue={attendance.numberoflateandleaveearly}
        >
          <Input placeholder="Please enter the number"
          ></Input>
        </Item>
      </Form>
    );
  }
}