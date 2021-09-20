import React, { useState, useEffect } from 'react';
import { Input, Form, Modal, Button, Row, Col, Checkbox, Select,InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,
    JEWELERY_GET_SUCCESS,
    JEWELERY_GET_ERROR,
    JEWELERY_ADD_ERROR,
} from '../../constant/redux-type'
import { AttributepickListGet, jewelryGet } from "../../redux/actions/jewelery-action"

const AddJewlryATT = ({ collectionList, addJewelryATT, edit, record, editClose, editJewelryATT, picklist }) => {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, setCheck] = useState(false)
    const [progress, setProgress] = useState(null);
    const [progressFlagSuccess, setProgressFlagSuccess] = useState(false);
    const [collectionName, setCollectionName] = useState('')
    const [error, setError] = useState('')
    const [Num, setNum] = useState('')
    const [Picklist, setPicklist] = useState([])
    const [Jewelerydata, setJewelerydata] = useState([])
    const [picklistdata, setpicklistdata] = useState(false)
    const [form] = Form.useForm();
    const { Option } = Select;
    const dispatch = useDispatch();

    const onHandleChangeNumeric = e => {
        let value = e.target.value;
       
        if (!Number(value)) {
        setError("Only number Validate");
        }
       
        setNum({ [e.target.name]: value });
        setError('');
  

       };
       
    const openModal = () => {
        setCheck(false)
        setIsModalVisible(true);

    };

    const fetchpicklist = () => {
        dispatch(AttributepickListGet()).then((result) => {
            if (result.type === ATTRIBUTE_PICKLIST_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setPicklist(result.response.data.data)
            } else if (result.type === ATTRIBUTE_PICKLIST_GET_ERROR) {
                setPicklist([])
            }
        })
    }
    const fetchJewelryData = () => {
        dispatch(jewelryGet()).then((result) => {
            if (result.type === JEWELERY_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setJewelerydata(result.response.data.data)
            } else if (result.type === JEWELERY_GET_ERROR) {
                setJewelerydata([])
            }
        })
    }


    function handleChange(value) {
        console.log(`selected ${value}`);
        if (value == "Picklist") {
            setpicklistdata(true)
            console.log('changed picklist')
            fetchpicklist()
        }
        else {
            setpicklistdata(false)
        }
    }




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
            // data.weight_override = data.weight_override === true ? 1 : 0
            if (!edit) {
                setCheck(false)
                addJewelryATT(data)

            }
            else {
                setCheck(false)
                console.log("record", record)
                editJewelryATT(data, record.id)
                console.log("EDIT DATA", data)

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
            hide: e.target.checked
        })
    }
    const handleCollection = (e, option) => {
        console.log("e, option", e, option.children)
        setCollectionName(option.children)
    }
    useEffect(() => {
        fetchJewelryData();
        setIsModalVisible(edit);
        if (edit) {
            console.log("record", record)
            form.setFieldsValue({

                component_detail_nm: record.component_detail_nm,
                data_type_desc: record.data_type_desc,
                min_val: record.min_val,
                max_val: record.max_val,
                format: record.format,
                // weight_override:record.weight_override,
                // melee_calc_assoc_fields:record.melee_calc_assoc_fields,
                jewelry_id: record.jewelry_id,
                ddl_id:record.ddl_id

            })
            setCheck(record.hide)



        }
    }, [edit])
    console.log("DATAA FOUND")


    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >Add</Button>
            <Modal
                title={!edit ? "Add Jewelry attribute" : "Edit Jewelry attribute"}
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
                                    name="jewelry_id"
                                    rules={[{ required: true, message: "Please input Jewelry!" }]}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    initialValue={null}
                                >

                                    <Select style={{ width: "100%" }} >
                                        {Jewelerydata && Jewelerydata.length && Jewelerydata.map((val, index) => {
                                            return (
                                                <Option value={val.id} key={val.id} >{val.jewelry_nm}</Option>
                                            )

                                        })}

                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">



                                <Form.Item
                                    label="Attribute Name"
                                    name="component_detail_nm"

                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: "Please input Jewelry name!" }]}
                                >
                                    <Input placeholder="Jewelry Name" />
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">



                                <Form.Item
                                    label="Collection Attribute Type"
                                    name="data_type_desc"
                                    rules={[{ required: true, message: "Please input ATTRIBUTE TYPE!" }]}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    initialValue={null}
                                >
                                    <Select name="attr_type" style={{ width: "100%" }} onChange={handleChange}>
                                        <Option value="Number">Number</Option>
                                        <Option value="TextBox">TextBox</Option>
                                        <Option value="Picklist">Picklist</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                                {picklistdata && <Form.Item
                                    label="Collection Attribute Type"
                                    name="ddl_id"
                                    rules={[{ required: true, message: "Please input Collection Attribute Type!" }]}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    initialValue={null}
                                >


                                    <Select style={{ width: "100%" }}>
                                        {Picklist && Picklist.length && Picklist.map((val, index) => {
                                            return (
                                                <Option value={val.id} key={val.id} >{val.ddl_nm}</Option>
                                            )

                                        })}

                                    </Select>
                                </Form.Item>}
                            </Col>


                            <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">



                            <Form.Item
                                    style={{ width:"100%"}}
                                    label="Minimum Value"
                                    name="min_val"
                                   
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: "Please input valuation Amount!",}]
                                    
                                }
                                >
                                    <Input type="number"  min={0} maxLength={12} placeholder="0"  /> 
                                   
                                     
                                </Form.Item>
                                
                            </Col>
                            <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">



                                <Form.Item
                                    style={{ marginLeft: "10px" }}
                                    label="Maximum Value"
                                    name="max_val"

                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: "Please input valuation Amount!" }]}
                                >
                                    <Input type="number" min={0} maxLength={12} placeholder="0" />
                                </Form.Item>
                            </Col>




                        </>

                        <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                            <Form.Item
                                label="Format"
                                name="format"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 23 }}
                            >
                                <Input.TextArea placeholder="format" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>
                        </Col>
                        <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                            <Form.Item
                                //  label="Weight OverRide"
                                name="hide"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={check}
                            >


                                <Checkbox
                                    checked={check}
                                    //value={check} 
                                    //defaultChecked={check} 
                                    onChange={onChange}>hide</Checkbox>

                            </Form.Item>
                        </Col>



                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AddJewlryATT;