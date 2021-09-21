import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd'
import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table"
import AddJewlryATT from './add-jewelryddlvalues';
import './ddlvalues-jewelry.css';
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

    const handleEdit = (data) => {
        console.log("66", data)
        setEditRecord(data)
        setEdit(true)
    }


    return (
        <React.Fragment>
            <Layout
                style={{ overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">


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