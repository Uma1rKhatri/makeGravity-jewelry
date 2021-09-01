import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, message, Button , Breadcrumb} from 'antd'
// import SearchBox from '../../component/SearchBox';
import TableComponent from "./Table";
import { useDispatch, useSelector } from 'react-redux';
//import AuctionCollectionAddComponent from './AddCollection';
//import {COLLECTION_EDIT_SUCCESS, COLLECTION_EDIT_ERROR, COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR, COLLECTION_ADD_SUCCESS, COLLECTION_ADD_ERROR } from '../../constant/redux-type';
//import {collectionAdd, collectionEdit, collectionGet} from '../../redux/actions/collection-action';
import { useLocation, useHistory } from 'react-router-dom'
import "../list.css"
const ItemsAuction = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const dataState = useSelector((state) => state)
    const [edit, setEdit] = useState(false)
    const [editRecord, setEditRecord] = useState({})
    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            images: null,
            auction_lot_number: 456,
            auction_name: "test",
            auction_lot_url: "https://spin.atomicobject.com/2018/08/20/objects-not-valid-react-child/",
            item_name: "test",
            "price_realised": "12.00",
            "estimate_low": "1.00",
            "estimate_high": "2.00",
            "description": "tes"


        }
    ])
    const { Content } = Layout;

    const breadCrumpRouting = () => {
        console.log("click")
        history.push('/auction-management')
    }

    // const handleSearch = (val) => {
    //     console.log("val...", val)
    // }
    // const handleEdit = (data) => {
    //     console.log("66", data)
    //     setEditRecord(data)
    //     setEdit(true)
    // }
    // const handleClose = (val) => {
    //     console.log("vla", val)
    //     setEdit(val)
    // }
    // const editHandler = (val) => {
    //     console.log("val", val)
    //     dispatch(collectionEdit(val)).then((result) => {

    //         if (result.type === COLLECTION_EDIT_SUCCESS) {
    //             console.log("result", result.response)
    //             fetchCollection()
    //             message.success(`record edit successfully!`, 3, onclose)
    //         } else if (result.type === COLLECTION_EDIT_ERROR) {
    //             message.error(`${result?.response?.data}`, 3, onclose)
    //         }
    //     })
    // }
    // const handleSubmit = (data) => {
    //     dispatch(collectionAdd(data)).then((result) => {
    //         if (result.type === COLLECTION_ADD_SUCCESS) {
    //             console.log("result", result.response)
    //             fetchCollection()
    //             message.success(`record add successfully!`, 3, onclose)
    //         } else if (result.type === COLLECTION_ADD_ERROR) {
    //             message.error(`${result?.response?.data}`, 3, onclose)
    //         }
    //     })

    // }

    // const fetchCollection = () => {
    //     dispatch(collectionGet()).then((result) => {
    //         if (result.type === COLLECTION_GET_SUCCESS) {
    //             console.log("result", result.response.data.data)
    //             setDataSource(result.response.data.data)
    //         } else if (result.type === COLLECTION_GET_ERROR) {
    //             setDataSource([])
    //         }
    //     })
    // }


    useEffect(() => {

        // fetchCollection()

    }, [])
    const handleClick = () => {
        let id = location.pathname.split("/");
        console.log("id", id[2])
        history.push(`auction-detail/${id[2]}`)
    }
    return (
        <React.Fragment>

            <Layout
                style={{ overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                <Breadcrumb>
                        <Breadcrumb.Item onClick={breadCrumpRouting} >Auction Management</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Items
                        </Breadcrumb.Item>

                    </Breadcrumb>
                    <br />
                    <Row justify="space-around" >


                        <Col xs={24} sm={12} md={16} className="gr-mb-2">
                            {/* <AuctionCollectionAddComponent collection={handleSubmit} collectionEdit={editHandler} edit={edit} editClose={handleClose} record={editRecord} /> */}
                            <Button style={{ background: "rgb(114, 120, 204)", color: '#fff' }}  onClick={handleClick} >Add</Button>
                        </Col>
                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            {/* <SearchBox search={handleSearch} /> */}

                        </Col>

                        <Col span={24}>
                            <TableComponent dataSource={dataSource}
                                loading={dataState?.auctionGet?.loading}
                            //  record={handleEdit}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default ItemsAuction;