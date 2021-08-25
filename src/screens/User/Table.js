import React, { useState } from 'react';
import { Table, Empty, Tooltip, Spin } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import Loader  from 'react-loader-spinner';
const TableComponent = ({ dataSource, loading }) => {
    const [flag, setFlag] = useState(false)

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: 200
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            width: 200
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 200,
            render: (text, record) => (
                <div>
                    {record.role === "user" ? "user" : "admin"}
                </div>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <div>
                    {record.enabled === 0 ? (
                        <Tooltip title="Deactive">
                            <CloseCircleOutlined
                                className="actionTooltip"
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.enabled === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Active">
                            <CheckCircleOutlined
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.enabled === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    )}
                </div>)

        },
    ];

    const handleActive = (data) => {
        let val = data.enabled === 0 ? 1 : 0
        data.enabled = val
        dataSource[data.key] = data
        setFlag(!flag)
    }
 
    return (
        <>
            <div className="user-table">
                <Table dataSource={dataSource} columns={columns}
                rowKey="id"
                    loading={loading ? { indicator: <Loader
                        type="Rings"
                        color="rgba(44, 62, 80,0.8)"
                        height={40}
                        width={40}
                      /> }:false}
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