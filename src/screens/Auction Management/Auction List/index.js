import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Input, message, Checkbox, Select } from 'antd'
import './list.css'
import TableComponent from './Table';
// import UserAddComponent from './AddUser'
import SearchBox from '../../../component/SearchBox'
// import { useDispatch, useSelector } from 'react-redux'
// import { userGet, userAdd } from '../../redux/actions/user-action'
// import { USER_GET_SUCCESS, USER_GET_ERROR, USER_ADD_SUCCESS, USER_ADD_ERROR } from '../../constant/redux-type';
// import { ReadCookie } from '../../utils/ReadCookie';

const AuctionList = () => {
    // const dispatch = useDispatch();
    // const dataState = useSelector((state) => state)
    const [dataSource, setDataSource] = useState([
        {
            "id": 1,
            "auction_name": "Test",
            "sales": "$14",
            "item": 13,
            "start_date": "1/7/2021",
            "end_date": "7/7/2021",
            "auction_url": "https://www.youtube.com/watch?v=vCWjK_z5tuM",
            "source": "https://res.cloudinary.com/asadaziz/image/upload/v1561444483/dummyavatar_kb3aub.png"

        },
        {
            "id": 2,
            "auction_name": "Test2",
            "sales": "$954",
            "item": 45,
            "start_date": "4/8/2021",
            "end_date": "7/8/2021",
            "auction_url": "https://www.youtube.com/watch?v=vCWjK_z5tuM",
            "source": "https://res.cloudinary.com/asadaziz/image/upload/v1561444483/dummyavatar_kb3aub.png"

        }
    ])
    // const [match, setMatch] = useState("")
    const { Content } = Layout;
    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    // const role = ReadCookie("role")
    const handleSearch = (val) => {
        console.log("val...", val)
    }

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }


    // const handleSubmit = (data) => {
    //     console.log("data...", data)
    //     let type = data.role === 1 ? "admin" : "user"
    //     console.log("type", type)
    //     dispatch(userAdd(data, type)).then((result) => {
    //         if (result.type === USER_ADD_SUCCESS) {
    //             console.log("result", result.response)
    //             fetchUser()
    //             message.success(`record add successfully!`, 3, onclose)
    //         } else if (result.type === USER_ADD_ERROR) {
    //             message.error(`${result?.response?.data}`, 3, onclose)
    //         }
    //     })
    //     data.key = dataSource.length
    //     setDataSource([...dataSource, data])
    // }

    // useEffect(() => {

    //   //  fetchUser()

    // }, [])
    return (
        <React.Fragment>

            <Layout
                style={{ height: "100vh", overflowY: "hidden", background: "white" }}
            >

                <Content style={{ margin: "20px" }}>
                    <Row justify="space-around">
                        <Col xs={24} sm={12} md={18} className="gr-mb-2">
                            <Select defaultValue="lucy" style={{ width: 160, marginBottom:20 }} onChange={handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>

                        </Col>

                        <Col xs={24} sm={12} md={4} className="gr-mb-2">
                            <Checkbox onChange={onChange}>Show Hidden</Checkbox>

                        </Col>

                        <Col xs={24} sm={12} md={6} className="gr-mb-2">
                            <SearchBox search={handleSearch} />

                        </Col>
                        <Col xs={24} sm={12} md={16} className="gr-mb-2">


                        </Col>

                        <Col span={24}>
                            <TableComponent dataSource={dataSource}
                            //loading={dataState?.userGet?.loading}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>


        </React.Fragment>
    )
}

export default AuctionList;