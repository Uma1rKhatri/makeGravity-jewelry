import React, { useState} from 'react';
import {Table, Empty, Tooltip} from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

const TableComponent = ({dataSource}) => {
    const [flag, setFlag] = useState(false)
  
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 200
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
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
                    {record.role === 0 ? "user" : "admin"}
                </div>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <div>
                    {record.isActive === 0 ? (
                        <Tooltip title="Deactive">
                            <CloseCircleOutlined
                                className="actionTooltip"
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.isActive === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Active">
                            <CheckCircleOutlined
                                onClick={() => handleActive(record)}
                                style={{
                                    color: record.isActive === 1 ? "green" : "red",
                                    marginRight: 10,
                                }}
                            />
                        </Tooltip>
                    )}
                </div>)

        },
    ];

    const handleActive = (data) => {
        let val = data.isActive === 0 ? 1 : 0
        data.isActive = val
        dataSource[data.key] = data
        setFlag(!flag)
    }
    return (
        <>
            <div className="user-table">
                <Table dataSource={dataSource} columns={columns}
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