import React, { useState } from "react";
import { Layout, Menu, Dropdown, Row, Col } from "antd";

// import { withRouter } from "react-router-dom";
import Sidebar from "../SideBar";
import "./header.css";

const { Header } = Layout;

const menu = (props) => (
  <Menu>
    <Menu.Item disabled>
      <a rel="noopener noreferrer" href="#/">
        Umair
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        onClick={() => {
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
          window.location = "/";
        }}
      >
        Logout
      </a>
    </Menu.Item>
  </Menu>
);


const HeaderComponent = (props) => {

  return (


    <div className="navbarMain">
      <div className="navBar">
        <div>
          <span className="title" style={{ cursor: "pointer", fontSize: 13, color: "#c5c5c5", fontWeight: "bold" }}>
          Make Gravity Jewellery
          </span>
        </div>
        <div style={{ width: "50px", display: "flex", alignItems: "center", }}  >
          <Dropdown overlay={menu(props)} placement="bottomCenter">
            <img
              style={{ float: "right", marginTop: 10 }}
              src="https://res.cloudinary.com/asadaziz/image/upload/v1561444483/dummyavatar_kb3aub.png"
              alt=""
              className="avatarImg"
              style={{ width: "70%", borderRadius: "20px" }}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  )

};

export default HeaderComponent;