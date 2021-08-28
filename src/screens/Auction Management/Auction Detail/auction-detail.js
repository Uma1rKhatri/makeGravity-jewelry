import React from "react";
import { Row, Col, Form, Input, DatePicker } from 'antd'
import moment from "moment";
import './detail.css'
const Detail = () => {
    const [form] = Form.useForm();
    const dateFormat = 'YYYY/MM/DD';
    return (
        <React.Fragment>
            <Form
                scrollToFirstError
                name="basic"
                form={form}

            >
                <Row>

                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">



                        <Form.Item
                            label="Source"
                            name="source"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input disabled placeholder="source" />
                        </Form.Item>
                    </Col>

                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Auction Name"
                            name="auction_name"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input disabled placeholder="Auction Name" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Auction Lot Number"
                            name="auction_lot_number"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                            <Input placeholder="Auction Lot" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Link to Item"
                            name="auction_lot_url"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <Input disabled placeholder="mysite" className="inp" />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="Start Date"
                            name="start_date"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 23 }}

                        >
                            <DatePicker className="inp" wrapperClassName="datepicker" defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} disabled />
                        </Form.Item>
                    </Col>
                    <Col className="ant-col-md-8 ant-col-sm-8 ant-col-xs-24">
                        <Form.Item
                            label="End Date"
                            name="end_date"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                        >
                        <DatePicker className="inp" wrapperClassName="datepicker" defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} disabled />
                        </Form.Item>
                    </Col>




                </Row>

            </Form>



        </React.Fragment >
    )
}

export default Detail;