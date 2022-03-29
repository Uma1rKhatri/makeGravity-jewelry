import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd'
import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table"
import AddJewlryATT from './add-jewelryddlvalues';
import './ddlvalues-jewelry.css';
import { useDispatch, useSelector } from 'react-redux'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,


} from '../../constant/redux-type';
import { collectionGet } from '../../redux/actions/collection-action';
import { jeweleryAttributeGet, jeweleryAttributeAdd, jeweleryAttributeEdit, pickListGet, AttributepickListGet } from "../../redux/actions/jewelery-action"
import AddjewelryDDL from './add-jewelryddlvalues'


const Jewelery = () => {
    const { Content } = Layout;
    const dispatch = useDispatch();
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
    const handleClose = (val) => {
        console.log("val", val)
        setEdit(val)
    }
    const fetchddl = () => {
        dispatch(AttributepickListGet()).then((result) => {
            if (result.type === ATTRIBUTE_PICKLIST_GET_SUCCESS) {
                setDataSource(result.response.data.data)
                console.log("DDL VALUES",result.response.data.data)

            }
            else if (result.type === ATTRIBUTE_PICKLIST_GET_ERROR) {
                setDataSource([])
                console.log("Failed to fetch DDL Values")
            }
        })
    }
    useEffect(() => {
        fetchddl()

    }, [])
    return (
        <React.Fragment>
            <Layout
                style={{ overflowY: "hidden", background: "white" }}
            >
                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">
                        <AddjewelryDDL
                        editClose={handleClose} />
                        <Col span={24}>
                        <TableComponent dataSource={dataSource}
                             loading={dataState?.AttributepickListGet?.loading} />
                        </Col>

                    </Row>
                </Content>
            </Layout>
        </React.Fragment>

    )
}


export default Jewelery;