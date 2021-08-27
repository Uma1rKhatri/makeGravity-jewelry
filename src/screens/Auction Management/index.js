import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Input, message, Checkbox, Select, Button } from 'antd'
import './list.css'
import TableComponent from './Table';
import SearchBox from '../../component/SearchBox'
import AuctionAddComponent from './AddAuction'
import { useDispatch, useSelector } from 'react-redux'
import { auctionAdd, auctionGet } from '../../redux/actions/auction-action'
 import {AUCTION_ADD_SUCCESS, AUCTION_ADD_ERROR, AUCTION_GET_SUCCESS, AUCTION_GET_ERROR } from '../../constant/redux-type';


const AuctionList = () => {
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state)
    const [edit, setEdit] =  useState(false)
    const [editRecord, setEditRecord] = useState({})
    const [dataSource, setDataSource] = useState([
       
    ])
    const { Content } = Layout;
    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const handleSearch = (val) => {
        console.log("val...", val)
    }

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }


    const handleSubmit = (data) => {
        console.log("data...", data)
  
    //     console.log("type", type)
        dispatch(auctionAdd(data)).then((result) => {
            if (result.type === AUCTION_ADD_SUCCESS) {
                console.log("result", result.response)
                fetchAuction()
                message.success(`record add successfully!`, 3, onclose)
            } else if (result.type === AUCTION_ADD_ERROR) {
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
    //     data.key = dataSource.length
    //     setDataSource([...dataSource, data])
     }
    const fetchAuction = () => {
        dispatch(auctionGet()).then((result) => {
            if (result.type === AUCTION_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setDataSource(result.response.data.data)
            } else if (result.type === AUCTION_GET_SUCCESS) {
                setDataSource([])
            }
        })
    }
    useEffect(() => {

        fetchAuction()

    }, [])

    const handleClose = (val) =>{
        console.log("vla", val)
        setEdit(val)
    }

    const handleEdit = (data) => {
        console.log("66", data)
        setEditRecord(data)
        setEdit(true)
    }
   

    return (
        <React.Fragment>

            <Layout
                style={{  overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">
                        <Col xs={24} sm={12} md={18} className="gr-mb-2">
                            <Select defaultValue="lucy" style={{ width: 160, marginBottom:20 }} onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>

                        </Col>

                        <Col xs={24} sm={12} md={4} className="gr-mb-2">
                            <Checkbox onChange={onChange}>Show Hidden</Checkbox>

                        </Col>

                        <Col xs={24} sm={12} md={16} className="gr-mb-2">
                          <AuctionAddComponent auction={handleSubmit} edit={edit} editClose={handleClose} record={editRecord} />

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

export default AuctionList;