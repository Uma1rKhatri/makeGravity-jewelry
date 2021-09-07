import React, { useState } from 'react';
import { Table, Empty, Spin, Tooltip } from 'antd'
import { EditOutlined, LinkOutlined, FundProjectionScreenOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import moment from 'moment';
//import mainLogo from './image.png';
import { useHistory } from 'react-router-dom';
const TableComponent = ({ dataSource, loading, record }) => {
    const [flag, setFlag] = useState(false)
    const history = useHistory();

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={record.images !== null ? record.auction_image_url : null} alt="image" height={60} width={60} />
                </div>
            )
        },
        {
            title: 'Auction Lot',
            dataIndex: 'auction_lot_number',
            key: 'auction_lot_number',
            width: 160,
        },
        {
            title: 'Auction Name',
            dataIndex: 'auction_name',
            key: 'auction_name',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: "14px" }} >{text}</strong>
                    <LinkOutlined style={{ color: "rgb(114, 120, 204)", position: 'relative', top: 0, left: 10 }} onClick={() => { openLink(record.auction_lot_url); }} className="link" />
                </div>
            )
        },
        {
            title: 'Item',
            dataIndex: 'item_name',
            key: 'item_name',
            width: 200,
        },
        {
            title: 'Price Realised',
            dataIndex: 'price_realised',
            key: 'price_realised',
            width: 200,
        },
        {
            title: 'Estimate Low',
            dataIndex: 'estimate_low',
            key: 'estimate_low',
            width: 200,
          
        },
        {
            title: 'Estimate High',
            dataIndex: 'estimate_high',
            key: 'estimate_high',
            width: 200,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render: (text, record) => (
                <div>
                    <Tooltip title="Edit">
                        <EditOutlined
                            className="actionTooltip"
                            onClick={() => handleEdit(record)}
                            style={{
                                color: "green",
                                marginRight: 10,
                            }}
                        />
                    </Tooltip>
                    {/* <Tooltip title="Detail">
                        <FundProjectionScreenOutlined
                            className="actionTooltip"
                            onClick={() => handleDetail(record)}
                            style={{
                                color: "green",
                                marginRight: 10,
                            }}
                        />
                    </Tooltip> */}

                    {/* <Tooltip title="Collection">
                        <MoneyCollectOutlined
                            className="actionTooltip"
                            onClick={() => handleCollection(record)}
                            style={{
                                color: "green",
                                marginRight: 10,
                            }}
                        />
                    </Tooltip> */}


                </div>)

        },
    ];

    const handleEdit = (data) => {
        console.log("data 113", data)
        record(data)
    }
    const openLink = (link) => {
        window.open(link)
    };
    const handleDetail = (data) => {
        history.push(`auction-detail/${data.id}`)
    }
    const handleCollection = (data) => {
        history.push(`auction-collection/${data.id}`)
    }
    return (
        <>
            <div className="user-table">
                <Table dataSource={dataSource} columns={columns}
                    rowKey="id"
                    loading={loading ? {
                        indicator: <Loader
                            type="Rings"
                            color="rgba(44, 62, 80,0.8)"
                            height={40}
                            width={40}
                        />
                    } : false}
                    scroll={{ x: "calc(100 + 50%)" }}
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                    bordered={true}
                    align="left"
                    locale={{
                        emptyText: <Empty description={"No Auction Item in the database "} />,
                    }}
                />
            </div>
        </>
    )
}

export default TableComponent;