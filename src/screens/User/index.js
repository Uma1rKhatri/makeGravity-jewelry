import React, { useState } from 'react'
import { Layout, Row, Col, Input } from 'antd'
import './user.css'
import TableComponent from './Table';
import UserAddComponent from './AddUser'
import SearchBox from '../../component/SearchBox'

const User = () => {
    const [dataSource, setDataSource] = useState([{
        key: 0,
        firstName: 'Mike',
        lastName: 'Haul',
        email: 'mike54@yahoo.com',
        role: 0,
        isActive: 1
    },
    {
        key: 1,
        firstName: 'John',
        lastName: 'Dav',
        email: "john65@hotmail.com",
        role: 0,
        isActive: 0
    },
    {
        key: 2,
        firstName: 'Sam',
        lastName: 'micky',
        email: "Sam22@gmail.com",
        role: 1,
        isActive: 1
    }])
    const { Content } = Layout;

    const handleSearch = (val) => {
        console.log("val...", val)
    }

    const handleSubmit = (data) => {
        console.log("data...", data)
        data.key = dataSource.length
        setDataSource([...dataSource, data])
    }

    return (
        <React.Fragment>
            <Layout
                style={{ height: "100vh", overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">
                        <Col xs={24} sm={12} md={12} className="gr-mb-2">
                            <UserAddComponent user={handleSubmit} />
                        </Col>

                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            <SearchBox search={handleSearch} />
                        </Col>
                        <Col span={24}>
                            <TableComponent dataSource={dataSource} />
                        </Col>
                    </Row>
                </Content>
            </Layout>


        </React.Fragment>
    )
}

export default User;