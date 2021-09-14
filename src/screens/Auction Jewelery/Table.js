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
            title: 'Jewelry Name',
            dataIndex: 'jewelry_nm',
            key: 'jewelry_nm',
            width: 200
         
        },

        {
            title: 'Valuation Units',
            dataIndex: 'valuation_units',
            key: 'valuation_units',
            width: 200
        },
        {
            title: 'Valuation Amount',
            dataIndex: 'valuation_amount',
            key: 'valuation_amount',
            width: 200
        },
        {
            title: 'Jewelry Description',
            dataIndex: 'jewelry_desc',
            key: 'jewelry_desc',
            width: 200
        },
        {
            title: 'Valuation Description',
            dataIndex: 'valuation_desc',
            key: 'valuation_desc',
            width: 200
        },

        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     key: 'action',
        //     width: 120,
        //     render: (text, record) => (
        //         <div>
        //             <Tooltip title="Edit">
        //                 <EditOutlined
        //                     className="actionTooltip"
        //                     onClick={() => handleEdit(record)}
        //                     style={{
        //                         color: "green",
        //                         marginRight: 10,
        //                     }}
        //                 />
        //             </Tooltip>

        //         </div>)

        // },
    ];

    const handleEdit = (data) => {
        console.log("data", data)
        record(data)
    }
console.log("dataSource", dataSource)
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