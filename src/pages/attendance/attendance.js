import React, {Component} from 'react';
import {Card,Button,Table,Input, Space,Modal,message} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {reqGetAttendance,reqAddAttendance} from '../../api/index';
import AttendanceForm from '../attendance/attendance-form';



export default class Attendance extends Component{

    
      state = {
        attendance:[],//List of all recordings
        searchText: '',//Enter text in search box
        searchedColumn: '',//Searched column
        showStatus: 0,//Whether to display the page
    };

    constructor(props) {
      super(props);
      this.us = React.createRef();
    }

    
    
 

    getAttendance = async() =>{
        const result = await reqGetAttendance(); 
        if (result){
            const attendance = result
            this.setState({
                attendance
            })
        }
    }   
    addAttendance = async () => {
        //收集数据
        let attendance = this.us.current.addAttendance();
        if (this.state.attendance.attendance_id) {
          attendance.attendance_id = this.state.attendance.attendance_id;
        }
        //   2.提交添加的请求
        const result = await reqAddAttendance(attendance.attendance_id); 
        // 3.更新列表显示
        if (result) {
            message.success(`${this.state.user.user_id?'修改':'添加'}角色成功`);
            this.getUsers();
            this.setState({ showStatus: 0 });
          } else {
            message.error(`${this.state.user.user_id?'修改':'添加'}角色失败`);
          }
          // //console.log(user);
        };
   showUpdate = (attendance) => {
     this.setState({attendance:attendance});
     this.setState({ showStatus: 1 });
   };
    
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
    
    handleCancel = () => {
        this.setState({ showStatus: 0 });
      };

      componentDidMount(){
        this.getAttendance();
      }
    
  


    render(){
        const{attendance,showStatus} = this.state;
        const title = (
          <span>
            <Button type="primary" onClick={() => {this.setState({ showStatus: 1, attendance: {} });}}>Create New Attendance</Button>
          </span>
        )
        this.columns = [
                {
                    title:'Attendance_id',
                    dataIndex:'attendance_id',
                    key:'attendance_id',
                    ...this.getColumnSearchProps('attendance_id'),
                },
                {
                    title:'Employee_id',
                    dataIndex:'employee_id',
                    key:'employee_id',
                    ...this.getColumnSearchProps('employee_id'),
                },
                {
                    title:'Employee_name',
                    dataIndex:'employee_name',
                    key:'employee_name',
                    ...this.getColumnSearchProps('employee_name'),
                },
                {
                    title:'Department_id',
                    dataIndex:'department_id',
                    key:'department_id',
                    ...this.getColumnSearchProps('department_id'),
                },
                {
                    title:'Working Time',
                    dataIndex:'workingtime',
                    key:'workingtime',
                    ...this.getColumnSearchProps('workingtime'),
                },
                {
                    title:'Off Work Time',
                    dataIndex:'offworktime',
                    key:'offworktime',
                    ...this.getColumnSearchProps('offworktime'),
                  
                },
                {
                    title:'Number of late and leave early',
                    dataIndex:'numberoflateandleaveearly',
                    key:'numberoflateandleaveearly',
                    ...this.getColumnSearchProps('numberoflateandleaveearly'),
                  
                },
                ]
      return(
            <Card title={title}>
                <Table
                 bordered
                 rowKey='attendance_id'
                 dataSource={attendance}
                 columns={this.columns}
                 pagination={{defaultPageSize: 5}}
                />
                              <Modal
           title={this.state.attendance.attendance_id ? "Add New Recording" : "Add new Employee"}
          visible={showStatus === 1}
          onOk={this.reqAddAttendance}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AttendanceForm ref={this.us} attendance={this.state.attendance} />
        </Modal>
            </Card>
            
        )
    }
}