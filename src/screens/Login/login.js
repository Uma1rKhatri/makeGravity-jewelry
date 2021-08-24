import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from "../../redux/actions/auth-action"
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from "../../constant/redux-type";
import Loader from "react-loader-spinner"
function Login() {
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  let history = useHistory();
  const dataState = useSelector((state) => state)
  const [disable, setDisable] = useState(false)

  const handleSubmit = (values) => {
    setDisable(true)
    dispatch(userLogin(values)).then((result) => {
    
      if (result.type === USER_LOGIN_SUCCESS) {

        let data = result?.response?.data;
        if (data !== undefined) {
          console.log("result", data?.data)
          document.cookie = `token=${data?.token?.access}`;
          document.cookie = `name=${data?.data?.first_name + " " + data?.data?.last_name}`;
          document.cookie = `role=${data?.data?.role}`;
          setDisable(false)
          history.push("/users");
          window.location.reload();
        }


      } else if (result.type === USER_LOGIN_ERROR) {
        message.error(`${result?.response?.data}`, 3, onclose).then(() => {
          setDisable(false)
        })

      }
    })

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  useEffect(() => {
    document.title = "Login | Make Gravity Jewellery";
  }, []);

  return (
    <Row className="login-main-page">
      <Col className="login-box" breakpoint="xs">
        <div className="form-parent">
          <h2 className="login-form-title">Make Gravity Jewellery</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            form={form}
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    type="user"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 5,
                  message: "The Password must be at least 5 characters long",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    type="lock"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={disable}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className={dataState?.login && dataState?.login?.loading === true ? "loader-bg" : "hide"}>
            <Loader type="Rings" color="rgba(44, 62, 80,1.0)" height={140} width={140} className="loader" />
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default Login;