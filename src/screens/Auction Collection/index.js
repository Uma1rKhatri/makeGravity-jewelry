import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd'
import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table";
import { useDispatch, useSelector } from 'react-redux';
import AuctionCollectionAddComponent from './AddCollection';
import {COLLECTION_EDIT_SUCCESS, COLLECTION_EDIT_ERROR, COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR, COLLECTION_ADD_SUCCESS, COLLECTION_ADD_ERROR } from '../../constant/redux-type';
import {collectionAdd, collectionEdit, collectionGet} from '../../redux/actions/collection-action';
import {useLocation} from 'react-router-dom'
import "./collection.css"
const AuctionCollection = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const dataState = useSelector((state) => state)
    const [edit, setEdit] = useState(false)
    const [editRecord, setEditRecord] = useState({})
    const [dataSource, setDataSource] = useState([
        // {
        //     id: 1,
        //     collection_name: "test",
        //     collection_description: "tester",
        //     images_file: null


        // }
    ])
    const { Content } = Layout;

    const handleSearch = (val) => {
        console.log("val...", val)
    }
    const handleEdit = (data) => {
        console.log("66", data)
        setEditRecord(data)
        setEdit(true)
    }
    const handleClose = (val) => {
        console.log("vla", val)
        setEdit(val)
    }
    const editHandler = (val) => {
        console.log("val", val)
        dispatch(collectionEdit(val)).then((result) => {

            if (result.type === COLLECTION_EDIT_SUCCESS) {
                console.log("result", result.response)
                fetchCollection()
                message.success(`record edit successfully!`, 3, onclose)
            } else if (result.type === COLLECTION_EDIT_ERROR) {
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
    }
    const handleSubmit = (data) => {
        dispatch(collectionAdd(data)).then((result) => {
            if (result.type === COLLECTION_ADD_SUCCESS) {
                console.log("result", result.response)
                fetchCollection()
                message.success(`record add successfully!`, 3, onclose)
            } else if (result.type === COLLECTION_ADD_ERROR) {
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
        //     data.key = dataSource.length
        //     setDataSource([...dataSource, data])
    }

    const fetchCollection = () => {
        dispatch(collectionGet()).then((result) => {
            if (result.type === COLLECTION_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setDataSource(result.response.data.data)
            } else if (result.type === COLLECTION_GET_ERROR) {
                setDataSource([])
            }
        })
    }


    useEffect(() => {

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
                            <AuctionCollectionAddComponent collection={handleSubmit} collectionEdit={editHandler} edit={edit} editClose={handleClose} record={editRecord} />

                        </Col>
                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            <SearchBox search={handleSearch} />

                        </Col>

                        <Col span={24}>
                            <TableComponent dataSource={dataSource}
                                loading={dataState?.auctionGet?.loading}
                                record={handleEdit}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default AuctionCollection;