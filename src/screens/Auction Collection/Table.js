import React, { useState } from 'react';
import { Table, Empty, Spin, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
const TableComponent = ({ dataSource, loading, record }) => {
    const [flag, setFlag] = useState(false)
    const history = useHistory();

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images_file',
            key: 'images_file',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={record.images_file !== null ? record.images_file : require('./image.png').default} alt="image" height={60} width={60} />
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'collection_name',
            key: 'collection_name',
            width: 200,
            render: (text, record) => (
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {text}

                </div>
            )
        },

        {
            title: 'Description',
            dataIndex: 'collection_description',
            key: 'collection_description',
            width: 200
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

                </div>)

        },
    ];

    const handleEdit = (data) => {
        console.log("data", data)
        record(data)
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
                        emptyText: <Empty description={"No Auction collection in the database "} />,
                    }}
                />
            </div>
        </>
    )
}

export default TableComponent;