import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, DatePicker, InputNumber, Button, Checkbox, Select, Divider } from 'antd'
import moment from "moment";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './detail.css';
import { useSelector, useDispatch } from 'react-redux';
import { jewelryGet } from '../../../redux/actions/jewelery-action';
import DemoCarousel from './slider';
import { JEWELERY_GET_SUCCESS, JEWELERY_GET_ERROR } from '../../../constant/redux-type'
let index = 0;
let arr = [1]
const AddDetail = ({ }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const dateFormat = 'YYYY/MM/DD';
    const { Option } = Select;
    const [items, setItems] = useState(['jack', 'lucy'])
    const [newName, setName] = useState('')
    const [pickList, setPickList] = useState([])
    const [jewelery ,setJewelery] = useState([])


    useEffect(() => {
        form.setFields([{ name: "auction", value: arr }]);
        dispatch(jewelryGet()).then((result) => {

            if (result.type === JEWELERY_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setJewelery(result.response.data.data)
                // form.setFieldsValue({
                //     jewelry_classification: result.response.data.data
                // })
            }
        })

    }, [])
    const onNameChange = event => {
        console.log("event", event.target.value)
        setName(event.target.value)
    };

    const addItem = () => {
        console.log('addItem');
        setItems([...items, newName || `New item ${index++}`])
        setName('')
    };
    function handleChange(value, fieldIndex) {
        let temp = pickList;
        temp[fieldIndex] = value;
        setPickList(prev => [...prev]);

        console.log(`selected ${value}`);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
        // setCheck(e.target.checked)
        // form.setFieldsValue({
        //     hidden: e.target.checked
        // })
    }
    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log("values", values)
        });

    };

    const handleChangeValue = (val) => {
        console.log(`val = ${val}`);
    }

    const removeNewField = (fieldIndex) => {
        console.log("arr", arr)
        if (Array.isArray(arr) && arr.length > 1) {

            arr.splice(fieldIndex, 1);
        }
        if (Array.isArray(pickList) && pickList.length > 0) {
            pickList.splice(fieldIndex, 1);
        }
        // setFlag(!flag)
        // setDisabe(false);
        // setSelectTemp(false)
        // console.log("arr form 172", arr)
        form.setFields([{ name: "auction", value: arr }]);

    }

    const newMethod = () => {
        arr.push(arr.length + 1)
    }

console.log("jew", jewelery)
    return (
        <React.Fragment>
            <Form
                scrollToFirstError
                name="basic"
                form={form}
                onFinish={handleSubmit}

            >
                <Row>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">



                        <Form.Item
                            label="Source"
                            name="source"
                            //  initialValue={val && val.source}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >

                            <Input placeholder="source" />
                        </Form.Item>
                    </Col>

                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Auction Name"
                            name="auction_name"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input placeholder="Auction Name" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Auction Lot Number"
                            name="auction_lot_number"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <Input placeholder="Auction Lot" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Link to Item"
                            name="auction_lot_url"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input placeholder="mysite" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Start Date"
                            name="start_date"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <DatePicker className="inp" wrapperClassName="datepicker" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="End Date"
                            name="end_date"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <DatePicker className="inp" wrapperClassName="datepicker" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-around">
                    <Col xs={24} sm={15} md={10} className="gr-mb-2">
                        <DemoCarousel />
                    </Col>
                </Row>
                <Row>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">



                        <Form.Item
                            label="Item Name"
                            name="item_name"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input placeholder="Item Name" />
                        </Form.Item>
                    </Col>

                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Price Realized"
                            name="price_realized"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input placeholder="Price Realized" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Price Estimate Low"
                            name="estimate_low"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}


                        >
                            <InputNumber min={0} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">

                        <Form.Item

                            name="estimate_high"
                            label="Price Estimate High"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}


                        >
                            <InputNumber min={0} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Item Description"
                            name="item_description"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input.TextArea placeholder="Item Description" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Condition Report"
                            name="condition_report"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <Input.TextArea placeholder="Condition Report" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Jewelry Classification"
                            name="jewelry_classification"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Select onChange={handleChangeValue}>
                                {jewelery && jewelery.length && jewelery.map((val, index)=>{
                                  return <Option value={val.id} key={val.id} >{val.jewelry_nm}</Option>
                                })}
                              
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                        <Form.List name="auction" >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {console.log("fields", fields)}

                                    {
                                        fields.map(({ key, name, fieldKey, ...restField }) => (

                                            <div key={key} className="add-component">
                                                <div style={{ float: 'right' }} >
                                                    <MinusCircleOutlined onClick={() => { remove(name); removeNewField(name); }} style={{ fontSize: '120%' }} />
                                                </div>

                                                <Form.Item
                                                    label="Pick List"
                                                    //  name={`Pick${name + 1}`}
                                                    {...restField} key={key}
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}

                                                >

                                                    <Select onChange={(e) => handleChange(e, name)}>
                                                        <Option value="list">List</Option>
                                                        <Option value="string">String</Option>
                                                        <Option value="number">Number</Option>
                                                    </Select>
                                                </Form.Item>


                                                {pickList[name] === "list" ?
                                                    <>
                                                        <Divider />
                                                        <Form.Item
                                                            label="DropDown"


                                                            labelCol={{ span: 24 }}
                                                            wrapperCol={{ span: 24 }}

                                                        >

                                                            <Select
                                                                placeholder="Select Pick List"
                                                                dropdownRender={menu => (
                                                                    <div>
                                                                        {menu}
                                                                        <Divider style={{ margin: '4px 0' }} />
                                                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                                            <Input style={{ flex: 'auto' }} value={newName} onChange={(e) => onNameChange(e)} />
                                                                            <a
                                                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                                                onClick={addItem}
                                                                            >
                                                                                <PlusOutlined /> Add item
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            >
                                                                {items.map(item => (
                                                                    <Option key={item}>{item}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </>
                                                    : pickList[name] === "string" ?
                                                        <>
                                                            <Divider />

                                                            <Form.Item
                                                                label="Text"


                                                                labelCol={{ span: 24 }}
                                                                wrapperCol={{ span: 24 }}

                                                            >
                                                                <Input placeholder="Text" className="inp" />
                                                            </Form.Item></>
                                                        : pickList[name] === "number" ?
                                                            <>
                                                                <Divider />
                                                                <Form.Item
                                                                    label="Value"


                                                                    labelCol={{ span: 24 }}
                                                                    wrapperCol={{ span: 24 }}

                                                                >
                                                                    <InputNumber min={0} placeholder="0" />
                                                                </Form.Item></> :
                                                            null
                                                }
                                            </div>
                                        ))
                                    }
                                    {/* {arr.length <= 2 ? */}
                                    <Form.Item className="mt-4">
                                        <Button onClick={() => { add(); newMethod() }} block icon={<PlusOutlined />} > Add Component </Button>
                                    </Form.Item>

                                    {/* : null} */}
                                </>
                            )}
                        </Form.List>
                    </Col>

                    <Col className="ant-col-md-4 ant-col-sm-4 ant-col-xs-12">
                        <Form.Item

                            name="hide"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}
                            initialValue={false}

                        >
                            <Checkbox onChange={onChange}>Hide</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-12">
                        <Form.Item
                            name="vip"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValue={false}

                        >
                            <Checkbox onChange={onChange}>VIP</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Score"
                            name="score"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input placeholder="Score" className="inp" />
                        </Form.Item>
                    </Col>

                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Collection Assigment"
                            name="collection_assigment"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <Input placeholder="Collection Assigment" className="inp" />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

            <div style={{ float: 'right' }} >
                <Button style={{ marginRight: '5px' }} type="primary" className="gr-mb-2" onClick={() => handleSubmit()}  >
                    {"Save"}
                </Button>
                <Button type="primary" onClick={() => handleSubmit()} className="gr-mb-2" >
                    {"Save & Approve"}
                </Button>
            </div>
        </React.Fragment >
    )
}

export default AddDetail;