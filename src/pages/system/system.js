import React, {Component} from 'react';
import { Table, Input, Button, Modal,Space,Card,message} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {reqGetUsers,reqUpdateUser,reqDeleteUser} from '../../api/index';
import LinkButton from '../../components/link-button/index';
import UserForm from '../system/user-form';

export default class System extends Component {

  constructor(props) {
    super(props);
    this.us = React.createRef();
    this.state = {
      users:[],
      user:{},
      searchText: '',
      searchedColumn: '',
      showStatus: 0,
      
    };
  }

  onRow= (user) => {
    return {
      onClick: (event) => {
        this.setState({ user });
      }, 
    };
  }

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
  getUsers = async() =>{
    const result = await reqGetUsers(); 
    console.log(result);
    if (result){
        const users = result
        this.setState({
            users
        })
    }
}   
// delete user
  deleteUser = (user) => {
    Modal.confirm({
      title: `Are you sure to delete ${user.username}?`,
      onOk: async () => {
        const result = await reqDeleteUser(user.user_id);
        if (result) {
          message.success("User deleted successfully!!");
          this.getUsers();
        } else {
          message.error("Failed to delete user!!");
        }
      },
    });
  };
  updateUsers = async () => {
    //collect user
    let user = this.us.current.updateUser();
    user.createtime = Date.now();
    if (this.state.user.user_id) {
      user.user_id = this.state.user.user_id;
    }
    //submit a request
    const result = await reqUpdateUser(user.user_id);
    //update data
    if (result) {
      message.success(`The information has been modified successfully!`);
      this.getUsers();
      this.setState({ showStatus: 0 });
    } else {
      message.error(`The information modification failed!`);
    }
    // //console.log(user);
  };
  showUpdate = (user) => {
    this.setState({user:user});
    this.setState({ showStatus: 1 });
  };

componentDidMount(){
  this.getUsers();

} 
handleCancel = () => {
  this.setState({ showStatus: 0 });
};





  render(){
    const{users,user,showStatus} = this.state;
    const title = (
      <span>
      <Button type="primary" onClick={() => {this.setState({ showStatus: 1, user: {} });}}>Create User</Button> &nbsp;&nbsp;
      <Button type="primary" disabled={!user.user_id}>Set User Permissions</Button>
      </span>
    );
    const columns = [
      {
        title: 'UserId',
        dataIndex: 'user_id',
        key: 'user_id',
        width: '15%',
        ...this.getColumnSearchProps('user_id'),
        
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '20%',
        ...this.getColumnSearchProps('username'),
        
      },
      {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        width: '20%',
        ...this.getColumnSearchProps('password'),
        
      },
      {
        title: 'EmployeeId',
        dataIndex: 'employee_id',
        key: 'employee_id',
        width: '15%',
        ...this.getColumnSearchProps('employee_id'),
      
      },
      {
        title: "Operation",
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>Edit</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>Delete</LinkButton>
          </span>
        ),
      },
     
    ];
 
    return (
           <Card title={title}>
           <Table 
           rowKey="user_id"
           pagination={{pageSize: 5,}}
           columns={columns} 
           dataSource={users} 
           rowSelection={{ type: "radio", selectedRowKeys: [user.user_id],onSelect:(user)=>{this.setState({user:user})} }} //Set radio
          onRow={this.onRow}
           bordered
           />
                   <Modal
          title={this.state.user.user_id ? "Edit User" : "Create User"}
          visible={showStatus === 1}
          onOk={this.updateUsers}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <UserForm  ref={this.us} user={this.state.user} />
        </Modal>
           </Card>
    )
  }
}