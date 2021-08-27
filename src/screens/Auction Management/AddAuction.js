import React, { useState, useEffect } from 'react';
import { Input, Form, Radio, Modal, Button, Row, Col, Select, Checkbox, DatePicker, Upload, Progress, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import moment from 'moment';

const AuctionAddComponent = ({ auction, edit, editClose, record, auctionEdit }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, setCheck] = useState(false)
    const [progress, setProgress] = useState(null);
    const [progressFlagSuccess, setProgressFlagSuccess] = useState(false);
    const [fileObject, setFileObject] = useState({});
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;

    const openModal = () => {
        setCheck(false)
        setIsModalVisible(true);

    };

    const Dragger = Upload.Dragger;
    const draggerProps = {
        name: "file",
        multiple: false,
        showUploadList: false,

        beforeUpload(file) {
            //  checkImageWH(file, 600, 600)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resetImageUpload();
                    let fileName = file.name;
                    let extension = fileName.substring(fileName.lastIndexOf(".") + 1);

                    if (/png/i.test(extension) || /jpg/i.test(extension) || /jpeg/i.test(extension)) {
                        if (file.size <= 1024 * 1024 * 30) {
                            resolve(file);
                        } else {
                            message.error("File size must be less then 30 mb", 3, onclose)
                        }
                    } else {
                        message.error("Please upload valid file format", 3, onclose)
                    }
                }, 1000);
            });
        },
        customRequest: ({ onSuccess, onError, file, onProgress }) => {
            let percent = 10;
            for (percent; percent <= 100; percent += 10) {
                if (percent > 100) {
                    break;
                }
                filePercentage(percent);
            }
            fileUpload(file);
            return {
                abort() { },
            };
        },
    };
    const filePercentage = (value) => {
        setProgress(value);
        setProgressFlagSuccess(true);
    };
    const fileUpload = (obj) => {
        setFileObject(obj);
        setFileObject((state) => {
            return state;
        });
    };
    const resetImageUpload = () => {
        setFileObject({});
    };

    const handleOk = () => {
        setCheck(false)
        setIsModalVisible(false);
        form.resetFields();
        setProgress(0);
        setFileObject({});

        editClose(false)
        form.setFieldsValue({
            hidden: false
        })
        // form.setFieldsValue({
        //     notes_text: null,
        //     hidden: null,
        //     auction_details_text: null
        // })
        // setCheck(false)

    };

    const handleCancel = () => {
        setCheck(false)
        setIsModalVisible(false);
        form.resetFields();

        editClose(false)
        setProgress(0);
        setFileObject({});
        form.setFieldsValue({
            hidden: false
        })

    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log("values", values)
            const rangeValue = values['dataPicker'];
            let data = {};

            data = values;

            if (!edit) {
                data.start_date = rangeValue[0]._d.toISOString();
                data.end_date = rangeValue[1]._d.toISOString();
                if (values.image !== undefined)
                    data.auction_image = values.image.file.originFileObj
                setCheck(false)
                auction(data)
                console.log("data", data)
            } else {
                data.id = record.id
                console.log("data", data)
                setCheck(false)
                auctionEdit(data)
            }




            setIsModalVisible(false)
            form.resetFields();
            setProgress(0);
            setFileObject({});
            editClose(false)

        });

    };
    const resetForm = () => {
        form.resetFields();
        setProgress(0);
        setFileObject({});
    }


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
    useEffect(() => {
        setIsModalVisible(edit);
        if (edit) {
            form.setFieldsValue({
                notes_text: record.notes_text,
                hidden: record.hidden,
                auction_details_text: record.auction_details_text
            })
            setCheck(record.hidden)
        }



    }, [edit])


    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >Add</Button>
            <Modal
                title={!edit ? "Add Auction" : "Edit Auction"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={() => resetForm()}>
                        Reset
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => handleSubmit()}>
                        {!edit ? "Add" : "Edit"}
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

                            {!edit &&
                                <>
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
                                        <Input placeholder="mysite" className="inp" disabled={edit} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Category"
                                        name="category"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        rules={[{ required: true, message: "Please input category!" }]}
                                    >
                                        <Input placeholder="Category" className="inp" disabled={edit} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Select Date"
                                        name="dataPicker"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}

                                        {...rangeConfig}
                                    >
                                        <RangePicker className="gx-w-100" disabled={edit} />
                                    </Form.Item>
                                </>
                            }
                            <Form.Item
                                label="Auction Details"
                                name="auction_details_text"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input category!" }]}
                            >
                                <Input.TextArea placeholder="Auction Details" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>
                            {edit &&
                                <Form.Item
                                    label="Notes"
                                    name="notes_text"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Input.TextArea placeholder="Notes" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                                </Form.Item>
                            }

                            <Form.Item
                                label="Hidden Item"
                                name="hidden"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={check}
                            >
                                <Checkbox 
                                checked={check}
                                //value={check} 
                               //defaultChecked={check} 
                                onChange={onChange}>Show Hidden</Checkbox>

                            </Form.Item>
                            {!edit &&
                                <Form.Item
                                    name="image"
                                    //  rules={[{ required: true, message: "Please select image!" }]}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Dragger {...draggerProps}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag file to this area to upload{" "}
                                        </p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload. Strictly prohibit
                                            from uploading company data or other band files
                                        </p>
                                    </Dragger>
                                </Form.Item>}
                            {progressFlagSuccess ? (
                                <div>
                                    {progress !== 0 ? (
                                        <Progress
                                            style={{ marginLeft: "10px", marginBottom: "10px" }}
                                            percent={progress}
                                        />
                                    ) : null}
                                    <p
                                        style={{
                                            color: "green",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {fileObject.name}
                                    </p>
                                </div>
                            ) : null}
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AuctionAddComponent;