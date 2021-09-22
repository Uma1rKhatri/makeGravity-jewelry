import React, { useState, useEffect } from 'react';
import { Table, Empty, Spin, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Input, Form, Modal, Row, Col, Checkbox, Select, InputNumber } from 'antd'
import { useHistory } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,
    JEWELERY_GET_ERROR,
    JEWELERY_GET_SUCCESS,
} from '../../constant/redux-type'

import { AttributepickListGet, jewelryGet } from "../../redux/actions/jewelery-action"

const TableComponent = ({ dataSource, loading, record }) => {
    const [flag, setFlag] = useState(false)
    const history = useHistory();
    const [Picklist, setPicklist] = useState([]);
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch = useDispatch();


    const handleEdit = (data) => {
        console.log("data", data)
        record(data)
    }
    const fetchpicklist = () => {
        dispatch(AttributepickListGet()).then((result) => {
            if (result.type === ATTRIBUTE_PICKLIST_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setPicklist(result.response.data.data)
            } else if (result.type === ATTRIBUTE_PICKLIST_GET_ERROR) {
                setPicklist([])
            }
        })
    }

    console.log("VALUES IN TABLE",dataSource)

        const columns = [
            {
                title: 'Ddl Name',
                dataIndex: 'ddl_nm',
                key: 'ddl_nm',
                width: 200
             
            },

        ]
    



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
            emptyText: <Empty description={"EMPTY"} />,
        }}
    />
</div>
</>
        
    )
}

export default TableComponent;