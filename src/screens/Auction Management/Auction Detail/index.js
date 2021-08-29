import React from "react";
import { Layout, Row, Col, Breadcrumb } from 'antd'
import Detail from './auction-detail';
import { useHistory } from 'react-router-dom'
import DemoCarousel from './slider';
import AddDetail from './add-auction-detail';
const AuctionDetail = () => {

    const { Content } = Layout;
    const history = useHistory()
    const breadCrumpRouting = () => {
        console.log("click")
        history.push('/auction-management')
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
                            Detail
                        </Breadcrumb.Item>

                    </Breadcrumb>
                    <div style={{ marginTop: "10px" }} >
                        <Row justify="space-around">
                            <Col span={24} className="gr-mb-2">
                                <Detail />
                            </Col>

                            <Col xs={24} sm={10} md={10} className="gr-mb-2">
                                <DemoCarousel />
                            </Col>

                            <Col className="gr-mb-2">
                            <AddDetail span={24} />

                            </Col>
                            <Col xs={24} sm={12} md={6} className="gr-mb-2">


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