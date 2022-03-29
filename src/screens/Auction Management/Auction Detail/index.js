import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Breadcrumb } from 'antd'
import Detail from './auction-detail';
import { useHistory, useLocation } from 'react-router-dom'
import DemoCarousel from './slider';
import AddDetail from './add-auction-detail';
import { useDispatch, useSelector } from 'react-redux';
import { auctionIdGet } from "../../../redux/actions/auction-action"
// import {auctionItemDetailsGet} from "../../../redux/actions/auction-item-action";
// import

const AuctionDetail = () => {

    const { Content } = Layout;
    const history = useHistory()
    const location = useLocation();
    const dispatch = useDispatch();
    // const [record, setRecord] = useState({})
    // const [lot, setLot] = useState();

    const breadCrumpRouting = (val) => {
        console.log("click", val)
        let id = location.pathname.split("/")
        console.log("click", id[3])
        if (val === "Items")
      history.push(`/auction-item/${id[3]}`)
        else
            history.push('/auction-management')
    }

    useEffect(() => {
        let id = location.pathname.split("/");
        // dispatch(auctionIdGet(id[2])).then((result) => {

        //     if (result.type === "AUCTION_GET_ID_SUCCESS") {
        //         let data = result?.response?.data?.data;
        //         setRecord(data)
        //     }
        // })


    }, [])
    // const handleLot = (val) => {
    //     console.log("val", val)
    //     setLot(val)
    // }
    return (
        <React.Fragment>

            <Layout
                style={{ overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => breadCrumpRouting('Auction Management')} >Auction Management</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => breadCrumpRouting('Items')} >Items</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Detail
                        </Breadcrumb.Item>

                    </Breadcrumb>
                    <div style={{ marginTop: "10px" }} >
                        <Row justify="space-around">
                            {/* <Col span={24} className="gr-mb-2">
                                <Detail data={record} lot={handleLot} />
                            </Col> */}



                            <Col className="gr-mb-2">
                                <AddDetail span={24} />

                            </Col>


                            <Col span={24}>

                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>


        </React.Fragment>
    )
}

export default AuctionDetail;