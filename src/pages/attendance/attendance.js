import React, {Component} from 'react';
import {Card,Button,Table,Input, Space,Modal,message} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {reqGetAttendance,reqAddAttendance,reqDeleteAttendance} from '../../api/index';
import AttendanceForm from '../attendance/attendance-form';
import LinkButton from '../../components/link-button/index';



export default class Attendance extends Component{
    constructor(props) {
      super(props);
      this.att = React.createRef();
      this.state= {
        attendances:[],//List of all recordings
        attendance:{},// one recording
        searchText: '',//Enter text in search box
        searchedColumn: '',//Searched column
        showStatus: 0,//Whether to display the page
    };
    }

    initColumns = () => {
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
            {
              title: "Operation",
              render: (attendance) => (
                  <LinkButton onClick={() => this.deleteAttendance(attendance)}>Delete</LinkButton>
              ),
            },
            ]}

    
    
 

    getAttendance = async() =>{
        const result = await reqGetAttendance(); 
        if (result){
            const attendances = result
            this.setState({
                attendances
            })
        }
    }   
    addAttendances = async () => {
        //Collect the data
        let attendance = this.att.current.addAttendance();
        if (this.state.attendance.attendance_id) {
          attendance.attendance_id = this.state.attendance.attendance_id;
        }
        //Submit an add request
        const result = await reqAddAttendance(attendance.attendance_id,attendance.employee_id,
          attendance.employee_name,attendance.department_id,attendance.workingtime,
          attendance.offworktime,attendance.numberoflateandleaveearly
          ); 
        // Update list display
        if (result) {
            message.success(`The record is added successfully!`);
            this.getAttendance();
            this.setState({ showStatus: 0 });
          } else {
            message.error(`Record modification failed!`);
          }
          // //console.log(user);
        };
        deleteAttendance = (attendance) => {
          Modal.confirm({
            title: `Are you sure to delete ${attendance.employee_name}?`,
            onOk: async () => {
              const result = await reqDeleteAttendance(attendance.attendance_id);
              if (result) {
                 message.success("The recording deleted successfully!!");
                 this.getAttendance();
                 this.setState({ showStatus: 0 });
              } else {
                message.error("Failed to delete this recording!!");
              }
            },
          });
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

      UNSAFE_componentWillMount() {
        this.initColumns();
      }
      componentDidMount(){
        this.getAttendance();
      }
    
  


    render(){
        const{attendances,showStatus} = this.state;
        const title = (
          <span>
            <Button type="primary" onClick={() => {this.setState({ showStatus: 1, attendance: {} });}}>Create New Recording</Button> 
          </span>
        )
      return(
            <Card title={title}>
                <Table
                 bordered
                 rowKey='attendance_id'
                 dataSource={attendances}
                 columns={this.columns}
                 pagination={{defaultPageSize: 5}}
                />
                              <Modal
           title={this.state.attendance.attendance_id ? "Add New Recording" : "Add new Employee"}
          visible={showStatus === 1}
          onOk={this.addAttendances}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AttendanceForm ref={this.att} attendance={this.state.attendance} />
        </Modal>
            </Card>
            
        )
    }
}