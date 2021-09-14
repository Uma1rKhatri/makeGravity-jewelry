import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd'
import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table"
import AddJewlry from './add-Jewelry';
import './auction-jewelery.css';
import {useDispatch, useSelector} from 'react-redux'
import { COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR, JEWELERY_GET_SUCCESS , JEWELERY_GET_ERROR, JEWELERY_ADD_ERROR, JEWELERY_ADD_SUCCESS} from '../../constant/redux-type';
import {collectionGet} from '../../redux/actions/collection-action';
import {jewelryGet, jeweleryAdd} from "../../redux/actions/jewelery-action"



const Jewelery = () => {
    const { Content } = Layout;
    const  dispatch = useDispatch();
    const dataState = useSelector((state) => state)
    const [dataSource, setDataSource] = useState([
       
    ])
    const [collection, setCollection] = useState([])
    const handleSearch = (val) => {
        console.log("search", val)
    }
    const handleSubmit = (val) => {
        console.log("val 26", val)
        dispatch(jeweleryAdd(val)).then((result) => {
            if (result.type === JEWELERY_ADD_SUCCESS) {
                console.log("result", result.response.data.data)
                fetchJewelery()
                message.success(`record add successfully!`, 3, onclose)
            } else if (result.type === JEWELERY_ADD_ERROR) {
                console.log("result?.response", result?.response)
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
    }
    const fetchJewelery = () => {
        dispatch(jewelryGet()).then((result) => {
            if (result.type === JEWELERY_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setDataSource(result.response.data.data)
            } else if (result.type === JEWELERY_GET_ERROR) {
                setDataSource([])
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
                            <AddJewlry submitData={handleSubmit}
                            data={collection}
                            // collectionEdit={editHandler} 
                            //  edit={edit} 
                            //   editClose={handleClose} 
                            ///   record={editRecord}
                            />

                        </Col>
                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            <SearchBox search={handleSearch} />

                        </Col>

                        <Col span={24}>
                            <TableComponent dataSource={dataSource}
                             loading={dataState?.jeweleryGet?.loading}
                            //  record={handleEdit}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </React.Fragment>
    )
}


export default Jewelery;