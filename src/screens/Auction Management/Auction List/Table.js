import React, { useState } from 'react';
import { Table, Empty, Spin } from 'antd'
import { EditOutlined, LinkOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import moment from 'moment';
const TableComponent = ({ dataSource, loading }) => {
    const [flag, setFlag] = useState(false)
   
    const columns = [
        {
            title: 'Auction Image',
            dataIndex: 'source',
            key: 'source',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={text} height={60} width={60} />
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
                 <strong style={{fontSize:"14px"}} >{text}</strong>  
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
        },
        {
            title: '# of Items',
            dataIndex: 'item',
            key: 'item',
            width: 200,
            sorter: (a, b) => a.item - b.item,
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
            width: 80,
            render: (text, record) => (
                <div>
                    <EditOutlined
                        className="actionTooltip"
                        onClick={() => handleEdit(record)}
                        style={{
                            color: "green",
                            marginRight: 10,
                        }}
                    />


                </div>)

        },
    ];

    const handleEdit = (data) => {
        console.log("data", data)
    }
    const openLink = (link) => {
        window.open(link)
    };
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