import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, DatePicker, InputNumber, Button, Checkbox, Select, Divider } from 'antd'
import moment from "moment";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './detail.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'
import { jewelryGet, jeweleryAttributeGet, pickListGet, jeweleryDdl } from '../../../redux/actions/jewelery-action';
import { auctionIdGet } from "../../../redux/actions/auction-action"
import DemoCarousel from './slider';
import { COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR, JEWELERY_GET_SUCCESS, JEWELERY_GET_ERROR, JEWELERY_ATTRIBUTE_GET_SUCCESS, JEWELERY_ATTRIBUTE_GET_ERROR, PICKLIST_GET_SUCCESS, PICKLIST_GET_ERROR, AUCTION_GET_ID_SUCCESS, AUCTION_GET_ID_ERROR, JEWELERY_DDL_ADD_SUCCESS, JEWELERY_DDL_ADD_ERROR, AUCTION_ITEM_ADD_SUCCESS, AUCTION_ITEM_ADD_ERROR, AUCTION_ITEM_DETAILS_GET_SUCCESS, AUCTION_ITEM_DETAILS_GET_ERROR } from '../../../constant/redux-type'
import { auctionItemAdd, auctionItemDetailsGet } from "../../../redux/actions/auction-item-action"
import { collectionGet } from "../../../redux/actions/collection-action"

let index = 0;
let arr = [{
    jewelry_id: null,
    "auction_jewelrycol": "",
}];
let dum = []
const AddDetail = ({ }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const dateFormat = 'YYYY/MM/DD';
    const { Option } = Select;
    const [items, setItems] = useState([])
    const [newName, setName] = useState('')
    const [pickList, setPickList] = useState([])
    const [jewelery, setJewelery] = useState([])
    const [picker, setPicker] = useState([]);
    const [checkVIP, setCheckVIP] = useState(false)
    const [checkHide, setcheckHide] = useState(false)
    const [collection, setCollection] = useState([])
    const [img, setImg] = useState([])
    const [collectionName, setCollectionName] = useState('')

    const fetchCollection = () => {
        dispatch(collectionGet()).then((result) => {
            if (result.type === COLLECTION_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setCollection(result.response.data.data)
            } else if (result.type === COLLECTION_GET_ERROR) {
                setCollection([])
            }
        })
    }


    const fetchAuction = (id) => {
        dispatch(auctionIdGet(id)).then((result) => {
            if (result.type === AUCTION_GET_ID_SUCCESS) {

                const { auction_name, source } = result.response.data.data
                console.log("result fetchAuction", auction_name)
                form.setFieldsValue({
                    source: source,
                    auction_name: auction_name

                })
            } else if (result.type === AUCTION_GET_ID_ERROR) {

                // form.setFieldsValue({
                //     source: null,
                //     auction_name: null

                // })
            }
        })
    }

    useEffect(() => {
        const { state } = location;
        // const { edit } = state;
        let uid = location.pathname.split("/");
        console.log("location 58", state, uid[5])
        if (uid[4] === "edit") {
            console.log("edit 62")
            dispatch(auctionItemDetailsGet(uid[5])).then((result) => {

                if (result.type === AUCTION_ITEM_DETAILS_GET_SUCCESS) {
                    // let formValues = form.getFieldsValue()
                    console.log("result 66", result.response.data.data)
                    let val = result.response.data.data;
                    console.log("auction_jewelry", val)
                    console.log("val.images.toString()", typeof val.images)
                    let imgConvert = val.images.replace(/,/g, " ").replace("[", "").replace("]", "");
                    setImg(imgConvert)
                    setCheckVIP(val.vip)
                    setcheckHide(val.auction_data_reviewed && val.auction_data_reviewed.length > 0 ? val.auction_data_reviewed[0].hide : false)
                    setCollectionName(val.collection_name)
                    form.setFieldsValue({
                        auction_lot_number: val.auction_lot_number,
                        auction_name: val.auction_name,
                        source: val.source,
                        auction_lot_url: val.auction_lot_url,
                        condition_report: val.condition_report,
                        estimate_high: val.estimate_high,
                        estimate_low: val.estimate_low,
                        images: imgConvert,
                        start_date: val.start_date ? moment(val.start_date) : "",
                        end_date: val.end_date ? moment(val.end_date) : "",
                        item_name: val.item_name,
                        vip: val.vip,
                        price_realised: val.price_realised,
                        classification: val.classification,
                        score: val.score,
                        description: val.description,
                        auction_jewelry: val.auction_jewelries,
                        score: val.auction_data_reviewed && val.auction_data_reviewed.length > 0 ? val.auction_data_reviewed[0].score : "",
                        collection_id: val.auction_data_reviewed && val.auction_data_reviewed.length > 0 ? val.auction_data_reviewed[0].collection_id : "",
                        hide: val.auction_data_reviewed && val.auction_data_reviewed.length > 0 ? val.auction_data_reviewed[0].hide : false

                    })
                    onLoadChangeValue()
                    // console.log('form.getFieldValue("auction_jewelry")', form.getFieldValue("auction_jewelry"));
                    // let list_auction_jewelry = form.getFieldValue("auction_jewelry");
                    // if (list_auction_jewelry && list_auction_jewelry.length > 0) {
                    //     list_auction_jewelry.map((item, index) => {
                    //         onLoadChangeValue(item.jewelry_id, index, { value: item.jewelry_id })
                    //     })
                    // }
                    // form.setFields([{ 
                    //     name: "auction_jewelry", value: formValues[auction_jewelry] }]
                    //     );
                    //setJewelery(result.response.data.data)
                } else if (result.type === AUCTION_ITEM_DETAILS_GET_ERROR) {
                    //setJewelery([])
                }
            })
        } else {

            // newMethod();
            fetchAuction(uid[3])
            form.setFields([{ name: "auction_jewelry", value: arr }]);
        }

        fetchJew()
        fetchCollection()

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
        if (newName.length > 0) {
            let data = {
                "ddl_id": val.ddl_id,
                "list_member_txt": newName,
                "pick_list_position": menu?.props?.flattenOptions?.length + 1,
                "value_1": "",
                "value_2": "",
                "value_3": "",
                "dependant_pick_list": ""
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
        console.log(`name = ${e.target.name} `)
        if (e.target.name === "vip")
            setCheckVIP(e.target.checked)
        else if (e.target.name === "hide")
            setcheckHide(e.target.checked)

        form.setFieldsValue({
            [e.target.name]: e.target.checked
        })
    }
    const handleSubmit = (val) => {
        console.log("val",val)
        let uid = location.pathname.split("/");
        form.validateFields().then((values) => {

            values.auction_id = uid[3];
            values.brand = null;
            if (values.images)
                values.images = `[${values.images.split(' ')}]`
            // values.images = '["https://sothebys-md.brightspotcdn.com/0f/31/244afe58459e8d93cf387233501c/hk1117-byd2m-1.jpg"]';
            values.currency = "USD";
            values.auctions_source = null
            values.is_approver = val
            values.vip = values.vip ? 1 : 0
            values.auctions_auction_id = uid[3]
            if (values.end_date)
                values.end_date = values.end_date._d.toISOString()
            else
                values.end_date = null
            if (values.start_date)
                values.start_date = values.start_date._d.toISOString()
            else
                values.start_date = null


            values.collection_name = collectionName
            console.log("values", values)
            dispatch(auctionItemAdd(values)).then((result) => {
                if (result.type === AUCTION_ITEM_ADD_SUCCESS) {
                    console.log("res success", result)
                    history.push(`/auction-item/${uid[3]}`)

                } else if (result.type === AUCTION_ITEM_ADD_ERROR) {

                    console.log("res erro", result)
                }
            })
        });

    };

    const onLoadChangeValue = () => {
        formValues = form.getFieldsValue()
        let { auction_jewelry } = form.getFieldsValue()
        if (auction_jewelry && auction_jewelry.length > 0) {
            auction_jewelry.map((item, index) => {
                console.log('item is item', item);
                let { auction_jewelry_attributes } = item
                if (auction_jewelry_attributes && auction_jewelry_attributes.length > 0) {
                    let arr = []
                    let finalResult = auction_jewelry_attributes.map((attribute) => {
                        console.log('attribute is attribute', attribute)
                        let { jewelry_attr_id, auction_jewelry_id, jewelry_attribute, ddl_id, auction_jewelry_attr_values } = attribute
                        let { component_detail_nm, data_type_desc } = jewelry_attribute
                        arr.push({
                            'component_detail_nm': component_detail_nm,
                            'data_type_desc': data_type_desc,
                            'ddl_id': ddl_id
                        })
                        return {
                            jewelry_attr_id: jewelry_attr_id,
                            jewelry_id: auction_jewelry_id,
                            ddl_id: ddl_id,
                            auction_jewelry_attr_value: [
                                {
                                    ddl_value: auction_jewelry_attr_values[0].ddl_value,
                                    "auction_jewelry_attr_valcol": ""
                                }
                            ]
                        }
                    })
                    dum[index] = arr;
                    Object.assign(auction_jewelry[index], { auction_jewelry_attribute: finalResult })
                    form.setFieldsValue({ auction_jewelry })
                    formValues['auction_jewelry'][index] = auction_jewelry;
                    setItems([])
                }
            })
        }


    }

    const handleChangeValue = (val, name, op) => {
        console.log(`val 112= ${val}`, name, op);
        let { auction_jewelry } = form.getFieldsValue()
        Object.assign(auction_jewelry[name], { jewelry_id: op.value })
        form.setFieldsValue({ auction_jewelry })
        console.log('check form values', formValues);
        formValues = form.getFieldsValue()
        formValues['auction_jewelry'][name] = auction_jewelry;

        dispatch(jeweleryAttributeGet(val)).then((result) => {

            if (result.type === JEWELERY_ATTRIBUTE_GET_SUCCESS) {
                dum[name] = result.response.data.data;
                console.log("result", result.response.data.data)
                let finalResult = result.response.data.data.map((item) => {
                    return {
                        jewelry_attr_id: item.id,
                        // jewelry_attribute: {
                        //     component_detail_nm: item.component_detail_nm,
                        //     data_type_desc: item.data_type_desc
                        // },
                        jewelry_id: op.value,
                        ddl_id: item.ddl_id,
                        auction_jewelry_attr_value: [
                            {
                                ddl_value: "",
                                "auction_jewelry_attr_valcol": ""
                            }
                        ]
                    }
                })
                console.log("finalResult result", finalResult)

                Object.assign(auction_jewelry[name], { auction_jewelry_attribute: finalResult })
                form.setFieldsValue({ auction_jewelry })
                formValues['auction_jewelry'][name] = auction_jewelry;

                // setPicker(result.response.data.data)
                //setJewelery(jewelery.filter(item => item.id !== val));
                setItems([])
            } else if (result.type === JEWELERY_ATTRIBUTE_GET_ERROR) {
                // setPicker([])
            }
        })



        //  fetchJew()
        //  console.log(" setJewelery([])", jewelery)

        //
    }

    const removeNewField = (fieldIndex) => {
        let formValues = form.getFieldsValue()

        if (formValues['auction_jewelry'] && formValues['auction_jewelry'].length > 1) {

            formValues['auction_jewelry'].splice(fieldIndex, 1);
        } else {
            formValues['auction_jewelry'][0] = {
                jewelry_id: null
            }
            form.setFields([{ name: "auction_jewelry", value: formValues['auction_jewelry'] }]);
        }

        dum.splice(fieldIndex, 1);


    }

    const newMethod = () => {
        if (formValues['auction_jewelry'] && formValues['auction_jewelry'].length > 0) {
            formValues['auction_jewelry'].push(
                {
                    jewelry_id: null
                }
            )
        } else {
            formValues['auction_jewelry'] = [{
                jewelry_id: null
            }]
        }

        // let { auction_jewelry } = form.getFieldsValue()
        // Object.assign(auction_jewelry[name], { jewelry_id: null })
        // form.setFieldsValue({auction_jewelry})
        // arr.push()
    }

    const Formfields = form.getFieldsValue()
    { console.log('umair Formfields', Formfields) }
    const { auction_jewelry } = Formfields
    { console.log("fields", auction_jewelry) }

    let formValues = form.getFieldsValue()
    // let formValues = {
    //     source: "Sample source",
    //     auction_name: "sample auction",
    //     auction_jewelry:
    //         [
    //             {
    //                 jewelry_id: 1,
    //                 notes: '',
    //                 auction_jewelry_attribute:
    //                     [{
    //                         jewelry_attr_id: '1234',
    //                         jewelry_attribute: {
    //                             component_detail_nm: "Gem type",
    //                             data_type_desc: "number"
    //                         },
    //                         jewelry_id: 1,
    //                         ddl_id: '',
    //                         auction_jewelry_attr_value: [
    //                             { ddl_value: "" }
    //                         ]
    //                     }]
    //             },
    //             {
    //                 jewelry_id: 2,
    //                 notes: '',
    //             }
    //         ]
    // };
    const handleCollection = (e, option) => {
        console.log("e, option", e, option.children)
        setCollectionName(option.children)
    }
    const handleImage = (e) => {
        console.log("e", e.target.value)
        setImg(e.target.value)
    }
    console.log("collection", collection)
    return (
        <React.Fragment>
            {console.log("form.getFieldsValue()", form.getFieldsValue())}
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
                            rules={[{ required: true, message: "Please input source!" }]}
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
                            rules={[{ required: true, message: "Please input auction name!" }]}
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
                            rules={[{ required: true, message: "Please input auction lot number!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <InputNumber maxLength={12} min={0} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Link to Item"
                            name="auction_lot_url"
                            rules={[{ required: true, message: "Please input auction lot url!" },
                            {
                                pattern: new RegExp(
                                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                                ),
                                message: "Invalid URL string!",
                            }]}
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
                            //  rules={[{ required: true, message: "Please input start date!" }]}
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
                            //   rules={[{ required: true, message: "Please input end date!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <DatePicker className="inp" wrapperClassName="datepicker" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-around">
                    <Col xs={24} sm={15} md={10} className="gr-mb-2">
                        <DemoCarousel data={img} />
                    </Col>
                </Row>
                <Row>
                    <Col className="ant-col-md-24 ant-col-sm-24 ant-col-xs-24">
                        <Form.Item
                            label="Images"
                            name="images"

                            rules={[{ required: true, message: "Please input image url!" },
                            {
                                pattern: new RegExp(
                                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                                ),
                                message: "Invalid URL string!",
                            }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <Input.TextArea onChange={handleImage} placeholder="Images  URL" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">



                        <Form.Item
                            label="Item Name"
                            wrapperCol={{ span: 23 }}
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: "Please input Item Name!" }]}
                            name="item_name"
                        >
                            <Input placeholder="Item Name" />
                        </Form.Item>
                    </Col>

                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Price Realised"
                            name="price_realised"
                            rules={[{ required: true, message: "Please input price realized!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <InputNumber maxLength={12} min={0} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Price Estimate Low"
                            name="estimate_low"
                            rules={[{ required: true, message: "Please input price low!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}


                        >
                            <InputNumber min={0} maxLength={12} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-6 ant-col-sm-12 ant-col-xs-24">

                        <Form.Item

                            name="estimate_high"
                            label="Price Estimate High"
                            rules={[{ required: true, message: "Please input price high!" }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}


                        >
                            <InputNumber maxLength={12} min={0} placeholder="0" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                        <Form.Item
                            label="Item Description"
                            name="description"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}
                            rules={[{ required: true, message: "Please input description!" }]}

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
                            name="classification"

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
                        <Form.List name="auction_jewelry"   >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {
                                        fields.map((field) => (
                                            <div key={field.key} className="add-component">
                                                <div style={{ float: 'right' }} >
                                                    <MinusCircleOutlined onClick={() => { remove(field.name); removeNewField(field.name); }} style={{ fontSize: '120%' }} />
                                                </div>
                                                <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-24">
                                                    <Form.Item
                                                        label="Component"
                                                        name={[field.name, "jewelry_id"]}
                                                        rules={[{ required: true, message: "Please input auction jewelry!" }]}
                                                        labelCol={{ span: 24 }}
                                                        wrapperCol={{ span: 23 }}
                                                    >
                                                        <Select onChange={(e, options) => handleChangeValue(e, field.name, options)}>
                                                            {jewelery && jewelery.length && jewelery.map((val, index) => {
                                                                return (

                                                                    <Option value={val.id} key={val.id} >{val.jewelry_nm}</Option>
                                                                )

                                                            })}

                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Form.Item
                                                    label="Component Detail"
                                                    key={field.key}
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}

                                                ></Form.Item>

                                                <Form.List name={[field.name, "auction_jewelry_attribute"]} fieldKey={[field.fieldKey, "auction_jewelry_attribute"]}>
                                                    {(attributeFields, { add, remove }, { errors }) => (
                                                        <>

                                                            {
                                                                attributeFields.map((attributeField) => (
                                                                    <div>
                                                                        {console.log('running auction_jewelry_attribute', attributeField)}
                                                                        {console.log('auction_jewelry auction_jewelry_attribute', dum)}

                                                                        {/* {console.log('auction_jewelry auction_jewelry_attribute', auction_jewelry ? auction_jewelry[field.name]['auction_jewelry_attribute'] ? auction_jewelry[field.name]['auction_jewelry_attribute'] : null : null)} */}
                                                                        {
                                                                            dum[field.name][attributeField.name] && dum[field.name][attributeField.name]['data_type_desc'] === "pick list" ?
                                                                                <Form.Item

                                                                                    label={dum[field.name][attributeField.name] ? dum[field.name][attributeField.name]['component_detail_nm'] : ""}
                                                                                    name={[attributeField.name, "auction_jewelry_attr_value", 0, 'ddl_value']}
                                                                                    labelCol={{ span: 4 }}
                                                                                    wrapperCol={{ span: 16 }}
                                                                                >
                                                                                    <Select
                                                                                        onFocus={(e) => handleChange(e, dum[field.name][attributeField.name], attributeField.name)}
                                                                                        placeholder="Select Pick List"
                                                                                        dropdownRender={menu => (

                                                                                            <div>
                                                                                                {menu}
                                                                                                <Divider style={{ margin: '4px 0' }} />
                                                                                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                                                                    <Input style={{ flex: 'auto' }} value={newName} onChange={(e) => onNameChange(e)} />
                                                                                                    <a
                                                                                                        style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                                                                        onClick={(e) => addItem(e, dum[field.name][attributeField.name], menu)}
                                                                                                    >
                                                                                                        {console.log("attributeField.name", attributeField.name)}
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
                                                                                </Form.Item> : dum[field.name][attributeField.name] && dum[field.name][attributeField.name]['data_type_desc'] === "number" ?
                                                                                    <Form.Item
                                                                                        label={dum[field.name][attributeField.name] ? dum[field.name][attributeField.name]['component_detail_nm'] : ""}
                                                                                        name={[attributeField.name, "auction_jewelry_attr_value", 0, 'ddl_value']}
                                                                                        labelCol={{ span: 4 }}
                                                                                        wrapperCol={{ span: 16 }}

                                                                                    >
                                                                                        <InputNumber min={0} placeholder="0" />
                                                                                    </Form.Item> :
                                                                                    <Form.Item
                                                                                        label={dum[field.name][attributeField.name] ? dum[field.name][attributeField.name]['component_detail_nm'] : ""}
                                                                                        name={[attributeField.name, "auction_jewelry_attr_value", 0, 'ddl_value']}
                                                                                        labelCol={{ span: 4 }}
                                                                                        wrapperCol={{ span: 16 }}
                                                                                    >
                                                                                        <Input placeholder="Text" className="inp" />
                                                                                    </Form.Item>
                                                                        }


                                                                    </div>


                                                                ))
                                                            }
                                                        </>
                                                    )}
                                                </Form.List>
                                                <Form.Item
                                                    label="Note"
                                                    name={[field.name, "notes"]}
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}
                                                >
                                                    <Input.TextArea placeholder="Note" className="inp" autoSize={{ minRows: 3, maxRows: 5 }} />
                                                </Form.Item>
                                            </div>


                                        ))
                                    }
                                    <Form.Item className="mt-4">
                                        <Button onClick={() => { add(); newMethod() }} block icon={<PlusOutlined />} > Add Component </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>


                    <Col className="ant-col-md-4 ant-col-sm-4 ant-col-xs-12">
                        <Form.Item

                            name="hide"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}
                            initialValue={checkHide}

                        >
                            <Checkbox checked={checkHide} name="hide" onChange={onChange}>Hide</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-12 ant-col-sm-12 ant-col-xs-12">
                        <Form.Item
                            name="vip"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValue={checkVIP}

                        >
                            <Checkbox name="vip" checked={checkVIP} onChange={onChange}>VIP</Checkbox>
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
                            name="collection_id"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValue={null}
                        >
                            <Select onChange={(e, options) => handleCollection(e, options)}>
                                {collection && collection.length && collection.map((val, index) => {
                                    return (
                                        <Option value={val.id} key={val.id} >{val.collection_name}</Option>
                                    )

                                })}

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>

            <div style={{ float: 'right' }} >
                <Button style={{ marginRight: '5px' }} type="primary" className="gr-mb-2" onClick={() => handleSubmit(false)}  >
                    {"Save"}
                </Button>
                <Button type="primary" onClick={() => handleSubmit(true)} className="gr-mb-2" >
                    {"Save & Approve"}
                </Button>
            </div>
        </React.Fragment >
    )
}

export default AddDetail;