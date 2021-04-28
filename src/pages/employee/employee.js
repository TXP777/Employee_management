import React, {Component} from 'react';
import {Card,Button,Table,Input, Space,Modal,message} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {reqGetEmployees,reqUpdateEmployee,reqDeleteEmployee} from '../../api/index';
import EmployeeForm from '../employee/employee-form';
import LinkButton from '../../components/link-button/index';


export default class Employee extends Component{

      state = {
        employees:[],//List of all employees
        employee:{},//Selected employees
        searchText: '',//Enter text in search box
        searchedColumn: '',//Searched column
        showStatus: 0,//Whether to display the page
    };

    constructor(props) {
      super(props);
      this.em = React.createRef();
    }

    initColumns = () => {
      this.columns = [
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
          title:'Employee_gender',
          dataIndex:'employee_gender',
          key:'employee_gender',
          ...this.getColumnSearchProps('employee_gender'),
      },
      {
          title:'Employee_qualification',
          dataIndex:'employee_qualification',
          key:'employee_qualification',
          ...this.getColumnSearchProps('employee_qualification'),
      },
      {
          title:'Employee_phone',
          dataIndex:'employee_phone',
          key:'employee_phone',
          ...this.getColumnSearchProps('employee_phone'),
      },
      {
          title:'Employee_address',
          dataIndex:'employee_address',
          key:'employee_adress',
          ...this.getColumnSearchProps('employee_address'),
        
      },
      {
        title: "Operation",
        render: (employee) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(employee)}>Edit</LinkButton>
            <LinkButton onClick={() => this.deleteEmployee(employee)}>Delete</LinkButton>
          </span>
        ),
      },
      ]}

    getEmployees = async() =>{
        const result = await reqGetEmployees(); 
        if (result){
            const employees = result
            this.setState({
                employees
            })
        }
    }    

    // delete employee
    deleteEmployee = (employee) => {
    Modal.confirm({
      title: `Are you sure to delete ${employee.employee_name}?`,
      onOk: async () => {
        console.log(employee.employee_id);
        const result = await reqDeleteEmployee(employee.employee_id);
        if (result) {
           message.success("Employee deleted successfully!!");
           this.getEmployees();
           this.setState({ showStatus: 0 });
        } else {
          message.error("Failed to delete employee!!");
        }
      },
    });
    };
    //update employee information
  updateEmployee = async () => {
    let employee = this.em.current.updateEmployee();
 
    if (this.state.employee.employee_id) {
      employee.employee_id = this.state.employee.employee_id;
    }
   
    const result = await reqUpdateEmployee(employee.employee_id);
    
    if (result) {
      message.success("Update Completed!");
      this.getEmployees();
      this.setState({ showStatus: 0 });
    } else {
      message.error("Update Failed!");
    }
    // //console.log();
   };
   showUpdate = (employee) => {
     this.setState({employee:employee});
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
        this.getEmployees();
      }



    render(){
        const{employees,showStatus} = this.state;
        const title = (
          <span>
            <Button type="primary" onClick={() => {this.setState({ showStatus: 1, employee: {} });}}>Create Employee</Button>
          </span>
        )

      return(
            <Card title={title}>
                <Table
                 bordered
                 rowKey='employee_id'
                 dataSource={employees}
                 columns={this.columns}
                 pagination={{defaultPageSize: 5}}
               
               
                />
        <Modal
          title={this.state.employee.employee_id ? "Edit Employee's Information" : "Create new Employee"}
          visible={showStatus === 1}
          onOk={this.updateEmployee}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <EmployeeForm ref={this.em} employee={this.state.employee} />
        </Modal>
            </Card>
            
        )
    }
}