import React, { useState, useEffect } from "react";
import HeaderComponent from "../../component/Header";
import AppSidebar from "../../component/SideBar";
import { useRouteMatch } from "react-router-dom";

import App from "./routes/index";
import "./mainApp.css";

import { Layout } from 'antd';

const MainApp = (props) => {
  const { Header, Footer, Sider, Content } = Layout;

  const match = useRouteMatch();
  useEffect(() => {
    document.title = "Dashboard | Make Gravity Jewellery";
  }, []);



  const handleToggle = (val) => {
    console.log("val", val);
    var test = val;
  }
  return (
    <>
      <Layout className="body">

        <AppSidebar props={props} />

        <Layout>
          <HeaderComponent />
          <div style={{ backgroundColor: "rgb(241, 240, 240)", height: "90vh", overflowY: "scroll" }}>
            <div className="content" style={{ width: "100%", overflowY: 'scroll' }} >
              <App match={match} />
            </div>
          </div>
        </Layout>
      </Layout>

    </>
  );
};

export default MainApp;