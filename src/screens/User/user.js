import React, { useState } from 'react'
import { Table, Layout, Empty, Button, Tooltip, Modal, Form, Row, Col, Input, Radio } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './user.css'
// const dataSource = [
  
// ];



const User = () => {
    const { Content } = Layout;
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([  {
        key: 0,
        firstName: 'Mike',
        lastName: 'Haul',
        email: 'mike54@yahoo.com',
        role: 0,
        isActive: 1
    },
    {
        key: 1,
        firstName: 'John',
        lastName: 'Dav',
        email: "john65@hotmail.com",
        role: 0,
        isActive: 0
    },
    {
        key: 2,
        firstName: 'Sam',
        lastName: 'micky',
        email: "Sam22@gmail.com",
        role: 1,
        isActive: 1
    }])
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 200
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 200
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 200,
            render: (text, record) => (
                <div>
                    {record.role === 0 ? "user" : "admin"}
                </div>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <div>
                    {record.isActive === 0 ? (
                        <Tooltip title="Deactive">
                            <CloseCircleOutlined
                                className="actionTooltip"
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.isActive === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Active">
                            <CheckCircleOutlined
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.isActive === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    )}
                </div>)

        },
    ];
    const handleActive = (data) => {
        let val = data.isActive === 0 ? 1 : 0
        data.isActive = val
        dataSource[data.key] = data
        setFlag(!flag)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
  
    const openModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      form.resetFields();
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
    };
  
    const handleSubmit = () => {
      form.validateFields().then((values) => {
          let data = {};
          data = values;
          data.key = dataSource.length
          data.isActive = 1;
        //   dataSource.push(data);
        setDataSource([...dataSource, data])
          setIsModalVisible(false) 
          form.resetFields();
   
      });
  
    };
    const resetForm = () => {
        form.resetFields();
    }
    return (
        <React.Fragment>
            <Layout
                style={{ height: "100vh", overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Button   onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >ADD</Button>

                    <div className="user-table">
                        <Table dataSource={dataSource} columns={columns}
                            scroll={{ x: "calc(100 + 50%)" }}
                            style={{ paddingLeft: 20, paddingRight: 20 }}
                            bordered={true}
                            align="left"
                            locale={{
                                emptyText: <Empty description={"No user in the database "} />,
                            }}
                        />
                    </div>

                </Content>
            </Layout>

            <Modal
                title="ADD USER"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={() => resetForm()}>
                        Reset
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => handleSubmit()}>
                        ADD
                    </Button>,
                ]}
            >
                <Form
                    scrollToFirstError
                    name="basic"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col className="ant-col-md-24">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input First Name!" }]}
                            >
                                <Input placeholder="First Name" className="inp" />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input Last Name!" }]}
                            >
                                <Input placeholder="Last Name" className="inp" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input Email!" }]}
                            >
                                <Input placeholder="demo@gmail.com" className="inp" />
                            </Form.Item>
                        
                            <Form.Item
                                label="Role"
                                name="role"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    { required: true, message: "Please select role!" },
                                ]}
                            >
                            <Radio.Group>
          <Radio value={0}>USER</Radio>
          <Radio value={1}>ADMIN</Radio>
    
        </Radio.Group>
                    
                            </Form.Item>
                           
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default User;