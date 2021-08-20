import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from 'antd';
import "./sidebar.css";
import {
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Layout, Menu, Icon, Dropdown } from "antd";
const { Sider } = Layout;



const AppSidebar = ({ props, test }) => {



//   const selectedKeys = props.location.pathname;
//   const arrSplit = selectedKeys.split("/");
//   let defaultOpenKeys;
//   let openKey = '';
//   if (arrSplit[2]) {
//     defaultOpenKeys = arrSplit[2]
//     openKey = arrSplit[1]
//   } else {
//     defaultOpenKeys = arrSplit[1]
 // }
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  }

  return (
    <div className="sidebar-height">
      <Sider
        breakpoint="md"
        collapsed={toggle}
        trigger={false}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[0]}
        >

          <div className="logo"><MenuOutlined onClick={handleClick} /></div>
    
         
          <Menu.Item
            style={{ paddingRight: "50px" }}
            key="jobs"
            icon={<UserOutlined />}
          >
            <Link to={`/users`}>
              <span>USERS</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default AppSidebar;