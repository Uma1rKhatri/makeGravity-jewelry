import React, { useState } from 'react';
import { Input, Form, Radio, Modal, Button, Row, Col } from 'antd'


const UserAddComponent = ({ user }) => {

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
            data.isActive = 1;
            user(data)
            setIsModalVisible(false)
            form.resetFields();

        });

    };
    const resetForm = () => {
        form.resetFields();
    }
    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >ADD</Button>
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
                        <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input First Name!" }]}
                            >
                                <Input placeholder="First Name" className="inp" />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
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
                                label="Password"
                                name="password"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input Password!" }, { min: 5, message: "Min password length required 5 character!" }]}
                            >
                                <Input.Password placeholder="Password" className="inp" />
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

export default UserAddComponent;