import React, { useState } from 'react';
import { Table, Empty, Spin, Tooltip } from 'antd'
import { EditOutlined, LinkOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import moment from 'moment';
import mainLogo from './image.png';
import { useHistory } from 'react-router-dom';
const TableComponent = ({ dataSource, loading, record }) => {
    const [flag, setFlag] = useState(false)
    const history = useHistory();

    const columns = [
        {
            title: 'Auction Image',
            dataIndex: 'source',
            key: 'source',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={record.auction_image_url !== null ? record.auction_image_url : require('./image.png').default} alt="image" height={60} width={60} />
                </div>
            )
        },
        {
            title: 'Link to Auction',
            dataIndex: 'auction_name',
            key: 'auction_name',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: "14px" }} >{text}</strong>
                    <LinkOutlined style={{ color: "rgb(114, 120, 204)", position: 'relative', top: 0, left: 10 }} onClick={() => { openLink(record.auction_url); }} className="link" />
                </div>
            )
        },
        {
            title: 'Total Sales',
            dataIndex: 'sales',
            key: 'sales',
            width: 200,
            sorter: {
                compare: (a, b) =>
                    (a.sales.length) -
                    (b.sales.length),
                multiple: 2,
            },
            render: (text, record) => (
                <div>{"$ 521"}</div>)
        },
        {
            title: '# of Items',
            dataIndex: 'item',
            key: 'item',
            width: 200,
            sorter: (a, b) => a.item - b.item,
            render: (text, record) => (
                <div>{52}</div>)
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: 200,
            sorter: (a, b) => moment(a.start_date).unix() - moment(b.start_date).unix()
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            width: 200,
            sorter: (a, b) => moment(a.end_date).unix() - moment(b.end_date).unix()
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
                    <Tooltip title="Detail">
                        <FundProjectionScreenOutlined
                            className="actionTooltip"
                            onClick={() => handleDetail(record)}
                            style={{
                                color: "green",
                                marginRight: 10,
                            }}
                        />
                    </Tooltip>


                </div>)

        },
    ];

    const handleEdit = (data) => {
        console.log("data", data)
        record(data)
    }
    const openLink = (link) => {
        window.open(link)
    };
    const handleDetail = (data) => {
        history.push(`auction-detail/${data.id}`)
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
                        emptyText: <Empty description={"No user in the database "} />,
                    }}
                />
            </div>
        </>
    )
}

export default TableComponent;