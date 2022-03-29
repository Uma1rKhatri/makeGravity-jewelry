import React, { useState, useEffect } from 'react';
import { Input, Form, Modal, Button, Row, Col, Checkbox, Select, InputNumber, Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,
    JEWELERY_GET_ERROR,
    JEWELERY_GET_SUCCESS,
} from '../../constant/redux-type'
import { AttributepickListGet, jewelryGet } from "../../redux/actions/jewelery-action"
import AddJewlryDDL from './add-jewelryddlvalues';
let dum = [];
const AddJewlryATT = ({ editClose }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, setCheck] = useState(false)
    const [edit, setEdit] = useState(false)
    const [Picklist, setPicklist] = useState([]);
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(null);
    let formValues = form.getFieldsValue()

    const openModal = () => {
        setCheck(false)
        setIsModalVisible(true);

    };


    const handleSubmit = () => {

        form.validateFields().then((values) => {

            console.log("VALUES OF FORM", values)

        })
    }

    const removeNewField = (fieldIndex) => {
        let formValues = form.getFieldsValue()

        if (formValues['values'] && formValues['values'].length > 1) {

            formValues['values'].splice(fieldIndex, 1);
        } else {
            formValues['values'][0] = {
                list_member_txt: ""
            }
            form.setFields([{ name: "values", value: formValues['values'] }]);
        }

        dum.splice(fieldIndex, 1);


    }
    const handleCancel = () => {
        setCheck(false)
        setIsModalVisible(false);
        form.resetFields();

        editClose(false)
        setProgress(0);
    };

    const newMethod = () => {
        if (formValues['values'] && formValues['values'].length > 0) {
            formValues['values'].push(
                {
                    list_member_txt: ""
                }
            )
        } else {
            formValues['values'] = [{
                list_member_txt: ""
            }]
        }
    }


    const handleEdit = (data) => {
        console.log("data", data)
        // record(data)
    }
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
    function handleChange(value) {
        console.log(`selected ${value}`);
        fetchpicklist()
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
    const resetForm = () => {
        form.resetFields();
        setProgress(0);
    }
    useEffect(() => {
        fetchpicklist()
        form.setFields([{
            name: "values", value: [{
                list_member_txt: ""
            }]
        }]);

    }, [form])

    // const addDDLValues = () => {
    //     let { values } = form.getFieldsValue();
    //     if (values && values.length > 0) {
    //         const value = {
    //             "list_member_txt": "",
    //             "pick_list_position": values ? values.lastIndexOf() + 1 : 1
    //         };

    //         values.push(value);
    //         form.setFieldsValue({ values })
    //         console.log("Clicked", value)
    //     }



    // }


    return (
        <React.Fragment>
            <Button onClick={() => openModal()} style={{ background: "rgb(114, 120, 204)", color: '#fff' }} >Add</Button>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={() => resetForm()}>
                        Reset
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => handleSubmit()}>
                        {!edit ? "Add" : "Edit"}
                    </Button>,]}>

                <Form
                    scrollToFirstError
                    name="basic"
                    form={form}
                // onFinish={handleSubmit}
                >

                    <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">


                        <Row>

                            <>

                                <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">

                                    <Row>
                                        <>

                                            <Form.Item
                                                label="Collection Attribute Type"
                                                name="ddl_id"
                                                rules={[{ required: true, message: "Please input ATTRIBUTE TYPE!" }]}
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                initialValue={null}
                                                style={{marginLeft:"10px",padding:"0" }}
                                            >


                                                <Select style={{ width: "100%"}}
                                                    label="Collection Attribute Type"
                                                    name="ddl_id"
                                                    rules={[{ required: true, message: "Please input Collection Attribute Type!" }]}
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}
                                                    initialValue={null}
                                                    onChange={handleChange}
                                                >
                                                    {Picklist && Picklist.length && Picklist.map((val, index) => {
                                                        return (
                                                            <Option value={val.id} key={val.id} >{val.ddl_nm}</Option>
                                                        )

                                                    })}

                                                </Select>

                                            </Form.Item>
                                        </>
                                    </Row>
                                </Col>


                            </>

                        </Row>


                    </Col>


                    <div style={{ border: "1px solid black", padding: "4px" }}>
                        <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                            <Form.List name="values">
                                {(fields, { add, remove }, { errors }) => (

                                    <>
                                        <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24" style={{ marginBottom: "15px" }}>


                                            <Row style={{ alignItems: "center" }}>





                                                <>

                                                    <h3 style={{ marginLeft: "10px" }} >ADD DDL VALUES</h3>



                                                    <Form.Item className="mt-4">
                                                        <Button onClick={() => { add(); newMethod() }} style={{ fontSize: "12px", marginLeft: "10px", border: "none", top: "10px" }} type="primary" icon={<PlusOutlined />} > Add Component </Button>
                                                    </Form.Item>

                                                </>

                                            </Row>


                                        </Col>




                                        {
                                            fields.map((field) => (

                                                <div key={field.key} className="add-component">

                                                    <h4 style={{ marginLeft: "15px" }}>DDL VALUES</h4>
                                                    <div style={{ float: 'right' }} >
                                                        <MinusCircleOutlined onClick={() => { remove(field.name); removeNewField(field.name); }} style={{ fontSize: '120%', margin: "5px", marginTop: "17px" }} />
                                                    </div>

                                                    <Form.Item rules={[{ required: true, message: "Please input Ddl Value!" }]} style={{ padding: "10px" }} name={[field.name, "list_member_txt"]}>

                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            ))
                                        }

                                    </>
                                )
                                }
                            </Form.List>
                        </Col>
                    </div>




                </Form>

            </Modal>
        </React.Fragment>
    )
}

export default AddJewlryATT;