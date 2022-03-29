import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Input, message } from 'antd'
import './user.css'
import TableComponent from './Table';
import UserAddComponent from './AddUser'
import SearchBox from '../../component/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { userGet, userAdd } from '../../redux/actions/user-action'
import { USER_GET_SUCCESS, USER_GET_ERROR, USER_ADD_SUCCESS, USER_ADD_ERROR } from '../../constant/redux-type';
import { ReadCookie } from '../../utils/ReadCookie';
import Error404 from "../../component/Page404";
const User = () => {
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state)
    const [dataSource, setDataSource] = useState([])
    const [match, setMatch] = useState("")
    const { Content } = Layout;
    const role = ReadCookie("role")
    const handleSearch = (val) => {
        console.log("val...", val)
    }

    const handleSubmit = (data) => {
        console.log("data...", data)
        let type = data.role === 1 ? "admin" : "user"
        console.log("type", type)
        dispatch(userAdd(data, type)).then((result) => {
            if (result.type === USER_ADD_SUCCESS) {
                console.log("result", result.response)
                fetchUser()
                message.success(`record add successfully!`, 3, onclose)
            } else if (result.type === USER_ADD_ERROR) {
                message.error(`${result?.response?.data}`, 3, onclose)
            }
        })
        data.key = dataSource.length
        setDataSource([...dataSource, data])
    }
    const fetchUser = () => {
        dispatch(userGet()).then((result) => {
            if (result.type === USER_GET_SUCCESS) {
                console.log("result", result.response.data.data)
                setDataSource(result.response.data.data)
            } else if (result.type === USER_GET_ERROR) {
                setDataSource([])
            }
        })
    }
    useEffect(() => {
        if (role === "admin") {
            setMatch("admin")
        } else {
            setMatch("user")
        }
        fetchUser()

    }, [])
    return (
        <React.Fragment>
            {match === "admin" ?
                <Layout
                    style={{  overflowY: "hidden", background: "white" }}
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
                                <TableComponent dataSource={dataSource}
                                    loading={dataState?.userGet?.loading}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>

                : match === "user" ? <Error404 /> : null}
        </React.Fragment>
    )
}

export default User;