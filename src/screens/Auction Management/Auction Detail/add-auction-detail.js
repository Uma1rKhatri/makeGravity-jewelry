import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, DatePicker, InputNumber, Button, Checkbox, Select, Divider } from 'antd'
import moment from "moment";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './detail.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { jewelryGet, jeweleryAttributeGet, pickListGet,jeweleryDdl } from '../../../redux/actions/jewelery-action';
import { auctionIdGet } from "../../../redux/actions/auction-action"
import DemoCarousel from './slider';
import { JEWELERY_GET_SUCCESS, JEWELERY_GET_ERROR, JEWELERY_ATTRIBUTE_GET_SUCCESS, JEWELERY_ATTRIBUTE_GET_ERROR, PICKLIST_GET_SUCCESS, PICKLIST_GET_ERROR, AUCTION_GET_ID_SUCCESS, AUCTION_GET_ID_ERROR, JEWELERY_DDL_ADD_SUCCESS, JEWELERY_DDL_ADD_ERROR } from '../../../constant/redux-type'
let index = 0;
let arr = [{
    component: null
}];
let dum = []
const AddDetail = ({ }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation()
    const dateFormat = 'YYYY/MM/DD';
    const { Option } = Select;
    const [items, setItems] = useState([])
    const [newName, setName] = useState('')
    const [pickList, setPickList] = useState([])
    const [jewelery, setJewelery] = useState([])
    const [picker, setPicker] = useState([])

    const fetchAuction = (id) => {
        dispatch(auctionIdGet(id)).then((result) => {
            if (result.type === AUCTION_GET_ID_SUCCESS) {

                const { auction_name, source } = result.response.data.data
                console.log("result", auction_name)
                form.setFieldsValue({
                    source: source,
                    auction_name: auction_name

                })
            } else if (result.type === AUCTION_GET_ID_ERROR) {
                form.setFieldsValue({
                    source: null,
                    auction_name: null

                })
            }
        })
    }

    useEffect(() => {
        let uid = location.pathname.split("/");
        fetchAuction(uid[3])
        form.setFields([{ name: "auction", value: arr }]);
        fetchJew()

    }, [])
    const fetchJew = () => {
        dispatch(jewelryGet()).then((result) => {

            if (result.type === JEWELERY_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setJewelery(result.response.data.data)
            } else if (result.type === JEWELERY_GET_ERROR) {
                setJewelery([])
            }
        })
    }
    const onNameChange = event => {
        console.log("event", event.target.value)
        setName(event.target.value)
    };

    const addItem = (e, val, menu) => {
        console.log("Items", items)
        if(newName.length > 0){
            let data = {
                "ddl_id" : val.ddl_id,
                "list_member_txt" : newName,
                "pick_list_position" : menu?.props?.flattenOptions?.length + 1,
                "value_1" : "",
                "value_2" : "",
                "value_3" : "",
                "dependant_pick_list" : ""
            }
            console.log("data", data)
            dispatch(jeweleryDdl(data)).then((result) => {

                if (result.type === JEWELERY_DDL_ADD_SUCCESS) {
                    console.log("result 81", result.response.data.data)
                   // setItems(result.response.data.data)
                    setItems([...items, result.response.data.data])
                   setName('')
                   // setName('')
                } else if (result.type === JEWELERY_DDL_ADD_ERROR) {
                    setName('')
                }
            })
            // setName('')
        }
        
//         console.log("items", val)
//   console.log('addItem', newName);
//   console.log("menu", menu?.props?.flattenOptions?.length + 1)
        // setItems([...items, newName || `New item ${index++}`])
        // setName('')
    };
    function handleChange(e, value, fieldIndex) {
        console.log("value 187", value, fieldIndex)

        if (value.data_type_desc === "pick list") {
            dispatch(pickListGet(value.ddl_id)).then((result) => {

                if (result.type === PICKLIST_GET_SUCCESS) {
                    console.log("result 81", result.response.data.data)
                    setItems(result.response.data.data)
                } else if (result.type === PICKLIST_GET_ERROR) {
                    setItems([])
                }
            })
        }
        // let temp = pickList;
        // console.log("list", pickList)
        // temp[fieldIndex] = picker[fieldIndex].data_type_desc;
        // setPickList(prev => [...prev]);

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

    const handleChangeValue = (val, name, op) => {
        console.log(`val 112= ${val}`, name, op);
        const fields = form.getFieldsValue()
        const {auction} = fields
        Object.assign(auction[name], {component: op.value})
        form.setFieldsValue({auction})
     
      
        dispatch(jeweleryAttributeGet(val)).then((result) => {

            if (result.type === JEWELERY_ATTRIBUTE_GET_SUCCESS) {
                dum[name] = result.response.data.data;
                console.log("result", result.response.data.data)
                setPicker(result.response.data.data)
              //setJewelery(jewelery.filter(item => item.id !== val));
                setItems([])
            } else if (result.type === JEWELERY_ATTRIBUTE_GET_ERROR) {
                setPicker([])
            }
        })
      //  fetchJew()
      //  console.log(" setJewelery([])", jewelery)

        //
    }

    const removeNewField = (fieldIndex) => {
        if (Array.isArray(arr) && arr.length > 1) {

            arr.splice(fieldIndex, 1);
        }else {
            arr[0] = {
                component: null
            }
            form.setFields([{ name: "auction", value: arr }]);
        }

        dum.splice(fieldIndex, 1);
     

    }

    const newMethod = () => {
        arr.push({
            component: null
        })
    }

const Formfields = form.getFieldsValue()
 const {auction} = Formfields
    {console.log("fields", auction)}
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
                            <Input placeholder="Item Link" className="inp" />
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
                            <Input placeholder="Jewelry Classification" className="inp" />
                            {/* <Select onChange={handleChangeValue}>
                                {jewelery && jewelery.length && jewelery.map((val, index) => {
                                    return <Option value={val.id} key={val.id} >{val.jewelry_nm}</Option>
                                })}

                            </Select> */}
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                        <Form.List name="auction" >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                               

                                    {
                                        fields.map(({ key, name, fieldKey, ...restField }) => (

                                            <div key={key} className="add-component">
                                                <div style={{ float: 'right' }} >
                                                    <MinusCircleOutlined onClick={() => { remove(name); removeNewField(name); }} style={{ fontSize: '120%' }} />
                                                </div>
                                                <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                                                    <Form.Item
                                                        label="Component"
                                                        name={[name, "component"]}

                                                        labelCol={{ span: 24 }}
                                                        wrapperCol={{ span: 23 }}

                                                    >
                                                    
                                                        <Select onChange={(e, options) => handleChangeValue(e, name, options)}>
                                                            {jewelery && jewelery.length && jewelery.map((val, index) => {
                                                                return (
                                                                
                                                                   
                                                                    <Option value={val.id} key={val.id} >{val.jewelry_nm}</Option>
                                                                )
                                                                
                                                            })}

                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* {
                                                    picker && picker.length > 0 && <label>Component Detail <br /><br /> </label>

                                                } */}
                                                {
                                                    dum[name] && dum[name].length > 0 &&

                                                    <Form.Item
                                                        label="Component Detail"
                                                        name={[name, "Component Detail"]}
                                                        {...restField} key={key}
                                                        labelCol={{ span: 24 }}
                                                        wrapperCol={{ span: 24 }}

                                                    >

                                                        {
                                                            dum[name] && dum[name].length > 0 && dum[name].map((val, index) => {
                                                                return (
                                                                    <>

                                                                        {
                                                                            val.data_type_desc === "pick list" ? 
                                                                            <Form.Item
                                                                                label={val.component_detail_nm}
                                                                                name={[name, val.component_detail_nm]}

                                                                                labelCol={{ span: 4 }}
                                                                                wrapperCol={{ span: 16 }}

                                                                            >


                                                                                <Select
                                                                                    onFocus={(e) => handleChange(e, val, name)}
                                                                                    placeholder="Select Pick List"
                                                                                    dropdownRender={menu => (
                                                                                    
                                                                                        <div>
                                                                                            {menu}
                                                                                            <Divider style={{ margin: '4px 0' }} />
                                                                                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                                                                <Input style={{ flex: 'auto' }} value={newName} onChange={(e) => onNameChange(e)} />
                                                                                                <a
                                                                                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                                                                    onClick={(e)=> addItem(e ,val, menu)}
                                                                                                >
                                                                                                    {console.log("key, name, fieldKey, ...restField ", key, name, fieldKey)}
                                                                                                    <PlusOutlined /> Add item
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                >

                                                                                    {items && items.length && items.map(item => (

                                                                                        <Option key={item.list_member_txt}>{item.list_member_txt}</Option>
                                                                                    ))}
                                                                                </Select>
                                                                            </Form.Item>
                                                                                : val.data_type_desc === "number" ? <Form.Item
                                                                                    label={val.component_detail_nm}

                                                                                    name={[name, val.component_detail_nm]}
                                                                                    labelCol={{ span: 4 }}
                                                                                    wrapperCol={{ span: 16 }}

                                                                                >
                                                                                    <InputNumber min={0} placeholder="0" />
                                                                                </Form.Item> :

                                                                                    <Form.Item
                                                                                        label={val.component_detail_nm}
                                                                                        name={[name, val.component_detail_nm]}
                                                                                        labelCol={{ span: 4 }}
                                                                                        wrapperCol={{ span: 16 }}

                                                                                    >
                                                                                        <Input placeholder="Text" className="inp" />
                                                                                    </Form.Item>}

                                                                        {/* {console.log("val", val)} */}

                                                                    </>


                                                                )
                                                            })
                                                        }
                                                    </Form.Item>
                                                }

                                                {/* <Form.Item
                                                    label="Component Detail"
                                                    name={[name, "componentDetail"]}
                                                    {...restField} key={key}
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}

                                                >

                                                    <Select onChange={(e, options) => handleChange(e, name, options)}>
                                                        {
                                                            picker && picker.length && picker.map((val, index) => {
                                                                return <Option value={val.id} key={index} >{val.component_detail_nm}</Option>
                                                            })
                                                        }

                                                    </Select>
                                                </Form.Item> */}


                                                {/* {pickList[name] === "pick list" ?
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
                                                                                {console.log("key, name, fieldKey, ...restField ", key, name, fieldKey)}
                                                                                <PlusOutlined /> Add item
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            >

                                                                {items && items.length && items.map(item => (

                                                                    <Option key={item.id}>{item.list_member_txt}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </>
                                                    :

                                                    pickList[name] === "number" ?
                                                        <>
                                                            <Divider />
                                                            <Form.Item
                                                                label="Value"


                                                                labelCol={{ span: 24 }}
                                                                wrapperCol={{ span: 24 }}

                                                            >
                                                                <InputNumber min={0} placeholder="0" />
                                                            </Form.Item></> :
                                                        <>
                                                            <Divider />

                                                            <Form.Item
                                                                label="Text"


                                                                labelCol={{ span: 24 }}
                                                                wrapperCol={{ span: 24 }}

                                                            >
                                                                <Input placeholder="Text" className="inp" />
                                                            </Form.Item></>
                                                } */}
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