import React, { useState, useEffect } from 'react';
import { Input, Form, Modal, Button, Row, Col, Checkbox, Select } from 'antd'



const AddJewlry = ({ collectionList, addJewelry, edit, record, editClose, editJewelry }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, setCheck] = useState(false)
    const [progress, setProgress] = useState(null);
    const [progressFlagSuccess, setProgressFlagSuccess] = useState(false);
    const [collectionName, setCollectionName] = useState('')
    const [form] = Form.useForm();
    const { Option } = Select;


    const openModal = () => {
        setCheck(false)
        setIsModalVisible(true);

    };



    const handleOk = () => {
        setCheck(false)
        setIsModalVisible(false);
        form.resetFields();
        setProgress(0);

        editClose(false)
        form.setFieldsValue({
            weight_override: false
        })
        // form.setFieldsValue({
        //     notes_text: null,
        //     hidden: null,
        //     auction_details_text: null
        // })
        setCheck(false)
        

    };

    const handleCancel = () => {
        setCheck(false)
        setIsModalVisible(false);
        form.resetFields();

        editClose(false)
        setProgress(0);
        form.setFieldsValue({
            weight_override: false
        })
        

    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log("values", values)
            let data = {};

            data = values;
            data.weight_override = data.weight_override === true ? 1 : 0
            if (!edit) {
                setCheck(false)
                addJewelry(data)
               
            }
            else {
                setCheck(false)
                console.log("record",record)
                editJewelry(data,record.id)

            }


            //     console.log("data", data)
            editClose(false)
            setCheck(false)
            setIsModalVisible(false)
            form.resetFields();


        });

    };
    const resetForm = () => {
        form.resetFields();
        setProgress(0);
    }


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        setCheck(e.target.checked)
        form.setFieldsValue({
            weight_override: e.target.checked
        })
    }
    const handleCollection = (e, option) => {
        console.log("e, option", e, option.children)
        setCollectionName(option.children)
    }
    useEffect(() => {
        setIsModalVisible(edit);
        if (edit) {
            console.log("record", record)
            form.setFieldsValue({
                jewelry_nm: record.jewelry_nm,
                valuation_units:record.valuation_units,
                valuation_amount:record.valuation_amount,
                jewelry_desc:record.jewelry_desc,
                valuation_desc:record.valuation_desc,
                weight_override:record.weight_override,
                melee_calc_assoc_fields:record.melee_calc_assoc_fields,
                collection_id:record.collection_id

            })
            setCheck(record.weight_override)
            
            

        }
    }
    , [edit])


    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >Add</Button>
            <Modal
                title={!edit ? "Add Jewelry" : "Edit Jewelry"}
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

                        <>
                            <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">



                                <Form.Item
                                    label="Jewelry"
                                    name="jewelry_nm"

                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: "Please input Jewelry name!" }]}
                                >
                                    <Input placeholder="Jewelry Name" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">

                                <Form.Item
                                    label="Valuation Units"
                                    name="valuation_units"

                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 23 }}
                                    rules={[{ required: true, message: "Please input valuation units!" }]}
                                >
                                    <Input min={0} maxLength={12} placeholder="0" />
                                </Form.Item>
                            </Col>

                            <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">



                                <Form.Item
                                    label="Valuation Amount"
                                    name="valuation_amount"

                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: "Please input valuation Amount!" }]}
                                >
                                    <Input min={0} maxLength={12} placeholder="0" />
                                </Form.Item>
                            </Col>


                        </>

                        <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                            <Form.Item
                                label="Jewelry Description"
                                name="jewelry_desc"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 23 }}
                            >
                                <Input.TextArea placeholder="Jewelry Description" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>
                        </Col>
                        <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                            <Form.Item
                                label="Valuation Description"
                                name="valuation_desc"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input.TextArea placeholder="Valuation Description" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>
                        </Col>
                        <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">



                            <Form.Item
                                label="Melee"
                                name="melee_calc_assoc_fields"

                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 23 }}
                            // rules={[{ required: true, message: "Please input Jewelry name!" }]}
                            >
                                <Input placeholder="Melee Name" />
                            </Form.Item>
                        </Col>
                        <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                            <Form.Item
                                label="Collection Assigment"
                                name="collection_id"

                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={null}
                            >
                                <Select onChange={(e, options) => handleCollection(e, options)}>
                                    {collectionList && collectionList.length && collectionList.map((val, index) => {
                                        return (
                                            <Option value={val.id} key={val.id} >{val.collection_name}</Option>
                                        )

                                    })}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                            <Form.Item
                                //  label="Weight OverRide"
                                name="weight_override"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={check}
                            >
                                <Checkbox
                                    checked={check}
                                    //value={check} 
                                    //defaultChecked={check} 
                                    onChange={onChange}>Weight OverRide</Checkbox>

                            </Form.Item>
                        </Col>



                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddJewlry;