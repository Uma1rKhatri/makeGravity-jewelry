import React, { useState, useEffect } from 'react';
import { Table, Empty, Spin, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Input, Form, Modal, Row, Col, Checkbox, Select, InputNumber } from 'antd'
import { useHistory } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,
    JEWELERY_GET_ERROR,
    JEWELERY_GET_SUCCESS,
} from '../../constant/redux-type'

import { AttributepickListGet, jewelryGet } from "../../redux/actions/jewelery-action"

const TableComponent = ({ dataSource, loading, record }) => {
    const [flag, setFlag] = useState(false)
    const history = useHistory();
    const [Picklist, setPicklist] = useState([]);
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch = useDispatch();


    const handleEdit = (data) => {
        console.log("data", data)
        record(data)
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
    useEffect(() => {
        fetchpicklist()

    }, [])

    const addDDLValues = () => {
        let { values } = form.getFieldsValue();
        if (values && values.length > 0) {
            const value = {
                "list_member_txt": "",
                "pick_list_position": values ? values.lastIndexOf() + 1 : 1
            };
            values.push(value);
            form.setFieldsValue({ values })
        }

    }



    return (
        <React.Fragment>
            <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">

                <Form
                    scrollToFirstError
                    name="basic"
                    form={form}
                // onFinish={handleSubmit}
                >
                    <Row>

                        <> <Form.Item
                            label="Collection Attribute Type"
                            name="data_type_desc"
                            rules={[{ required: true, message: "Please input ATTRIBUTE TYPE!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValue={null}
                        >
                            <Select style={{ width: "100%" }}
                                label="Collection Attribute Type"
                                name="ddl_id"
                                rules={[{ required: true, message: "Please input Collection Attribute Type!" }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValue={null}
                                onChange={handleChange}>
                                {Picklist && Picklist.length && Picklist.map((val, index) => {
                                    return (
                                        <Option value={val.id} key={val.id} >{val.ddl_nm}</Option>
                                    )

                                })}

                            </Select>
                        </Form.Item>
                        </>


                    </Row>
                </Form>
            </Col>
            <div className="site-page-header-ghost-wrapper">
<Form>
                <Form.Item
                >
                    <Button style={{ marginRight: "720px" }} onClick={() => addDDLValues()} key="1" icon={<PlusOutlined />}>
                    Add DDL Values
                </Button>
                </Form.Item>
               

                <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                    <Form.List name="auction_jewelry">
                    </Form.List>
                </Col>



                </Form>
            </div>
        </React.Fragment>
    )
}

export default TableComponent;