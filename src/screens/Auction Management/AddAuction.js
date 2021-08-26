import React, { useState } from 'react';
import { Input, Form, Radio, Modal, Button, Row, Col, Select, Checkbox, DatePicker } from 'antd'


const AuctionAddComponent = ({ auction }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, setCheck] = useState(false)
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;

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
            console.log("values", values)
            const rangeValue = values['dataPicker'];
            // console.log("start", rangeValue[0]._d.toISOString())
            // console.log("end", rangeValue[1]._d.toISOString())
            // let uri = values.auction_url.substring(0, values.auction_url.lastIndexOf('.'))
            // console.log( "1", uri )
            let data = {};
           
            data = values;
           // data.auction_url = values.prefix + uri + values.suffix;
            data.start_date = rangeValue[0]._d.toISOString();
            data.end_date = rangeValue[1]._d.toISOString();
           

            auction(data)
            setIsModalVisible(false)
            form.resetFields();

        });

    };
    const resetForm = () => {
        form.resetFields();
    }

    //const { Option } = Select;

    // const selectBefore = (
    //     <Form.Item name="prefix" noStyle initialValue={"https://"} >
    //         <Select defaultValue="https://">
    //             <Option value="https://">https://</Option>
    //             <Option value="http://">http://</Option>
    //         </Select>
    //     </Form.Item>
    // );
    // const selectAfter = (
    //     <Form.Item name="suffix" noStyle initialValue={".com"} >
    //         <Select defaultValue=".com" >

    //             <Option value=".com">.com</Option>
    //             <Option value=".org">.org</Option>
    //         </Select>
    //     </Form.Item>
    // );

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        setCheck(e.target.checked)
        form.setFieldsValue({
            hidden: e.target.checked
        })
    }
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select date!',
            },
        ],
    };

    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >ADD</Button>
            <Modal
                title="ADD AUCTION"
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
                                label="Source"
                                name="source"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input source!" }]}
                            >
                                <Input placeholder="source" />
                            </Form.Item>
                            <Form.Item
                                label="Auction Name"
                                name="auction_name"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input auction name!" }]}
                            >
                                <Input placeholder="Auction Name" className="inp" />
                            </Form.Item>

                            <Form.Item
                                label="Auction URL"
                                name="auction_url"

                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input auction URL!" }, {
                                    pattern: new RegExp(
                                        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                    ),
                    message: "Invalid URL string!",
                                }]}
                            >
                                <Input  placeholder="mysite" className="inp" />
                            </Form.Item>
                            <Form.Item
                                label="Category"
                                name="category"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input category!" }]}
                            >
                                <Input placeholder="Category" className="inp" />
                            </Form.Item>
                            <Form.Item
                                label="Select Date"
                                name="dataPicker"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}

                                {...rangeConfig}
                            >
                                <RangePicker className="gx-w-100" />
                            </Form.Item>

                            <Form.Item
                                label="Auction Details"
                                name="auction_details_text"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input category!" }]}
                            >
                                <Input.TextArea placeholder="Category" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>

                            <Form.Item
                                label="Hidden Item"
                                name="hidden"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={check}
                            >
                                <Checkbox onChange={onChange}>Show Hidden</Checkbox>

                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AuctionAddComponent;