import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd'
import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table"
import AddJewlryATT from './add-JewelryAttribute';
import './attribute-jewelry.css';
import {useDispatch, useSelector} from 'react-redux'
import { COLLECTION_GET_SUCCESS, 
    COLLECTION_GET_ERROR, 
    JEWELERY_GET_SUCCESS , 
    JEWELERY_GET_ERROR, 
    JEWELERY_ADD_ERROR, 
    JEWELERY_ADD_SUCCESS,
    JEWELERY_EDIT_REQUEST,
    JEWELERY_ATTRIBUTE_EDIT_SUCCESS,
    JEWELERY_ATTRIBUTE_EDIT_ERROR,
    JEWELERY_ATTRIBUTE_ADD_ERROR,
    JEWELERY_ATTRIBUTE_ADD_REQUEST,
    JEWELERY_ATTRIBUTE_ADD_SUCCESS,
    JEWELERY_ATTRIBUTE_GET_REQUEST,
    JEWELERY_ATTRIBUTE_GET_SUCCESS,
    JEWELERY_ATTRIBUTE_GET_ERROR,   
  

} from '../../constant/redux-type';
import {collectionGet} from '../../redux/actions/collection-action';
import {jeweleryAttributeGet, jeweleryAttributeAdd, jeweleryAttributeEdit,pickListGet} from "../../redux/actions/jewelery-action"



const Jewelery = () => {
    const { Content } = Layout;
    const  dispatch = useDispatch();
    const dataState = useSelector((state) => state)
    const [edit, setEdit] = useState(false)
    const [editRecord, setEditRecord] = useState({})
    const [dataSource, setDataSource] = useState([
       
    ])
    const [collection, setCollection] = useState([])
    const [picklist, setPicklist] = useState([])

    
      const handleSearch = (val) => {
        console.log("search", val)
    }
    const handleEdit = (data) => {
        console.log("66", data)
        setEditRecord(data)
        setEdit(true)
    }
    const handleClose = (val) => {
        console.log("val", val)
        setEdit(val)
    }
    const editHandler = (val,id) => {
        console.log("val", val)
        dispatch(jeweleryAttributeEdit(val,id)).then((result) => {

            if (result.type === JEWELERY_ATTRIBUTE_EDIT_SUCCESS) {
                console.log("result", result.response)
                fetchJewelery()
                message.success(`record edit successfully!`, 3, onclose)
            } else if (result.type === JEWELERY_ATTRIBUTE_EDIT_ERROR) {
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
    }
    
    const handleSubmit = (val) => {
        console.log("val 26", val)
        dispatch(jeweleryAttributeAdd(val)).then((result) => {
            if (result.type === JEWELERY_ATTRIBUTE_ADD_SUCCESS) {
                console.log("result", result.response.data.data)
                fetchJewelery()
                message.success(`record add successfully!`, 3, onclose)
            } else if (result.type === JEWELERY_ATTRIBUTE_ADD_ERROR) {
                console.log("result?.response", result?.response)
                console.log("ATTRIBUTE ADD ERROR")
                message.error(`${result?.response?.data.data}`, 3, onclose)
            }
        })
    }
    const fetchJewelery = () => {
        dispatch(jeweleryAttributeGet()).then((result) => {
            if (result.type === JEWELERY_ATTRIBUTE_GET_SUCCESS) {
                console.log("NEW DATA", result.response.data.data)
                setDataSource(result.response.data.data)
            } else if (result.type === JEWELERY_ATTRIBUTE_GET_ERROR) {
                setDataSource([])
                console.log("FAILED TO GET")
            }
        })
    }

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


    useEffect(() => {
        fetchJewelery()
        fetchCollection()

    }, [])
    return (
        <React.Fragment>
            <Layout
                style={{ overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">


                        <Col xs={24} sm={12} md={16} className="gr-mb-2">
                            <AddJewlryATT addJewelryATT={handleSubmit}
                            collectionList={collection}
                            editJewelryATT={editHandler} 
                             edit={edit} 
                            editClose={handleClose} 
                             record={editRecord}
                             picklist={picklist}
                            />

                        </Col>
                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            <SearchBox search={handleSearch} />

                        </Col>

                        <Col span={24}>
                            <TableComponent dataSource={dataSource}
                             loading={dataState?.jeweleryAttributeGet?.loading}
                             record={handleEdit}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </React.Fragment>
    )
}


export default Jewelery;