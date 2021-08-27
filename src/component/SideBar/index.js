import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from 'antd';
import "./sidebar.css";
import { ReadCookie } from "../../utils/ReadCookie";
import {
  UserOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Layout, Menu, Icon, Dropdown } from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


const AppSidebar = ({ props, test }) => {



  const selectedKeys = props.location.pathname;
  const arrSplit = selectedKeys.split("/");
  let defaultOpenKeys;
  let openKey = '';
  if (arrSplit[2]) {
    defaultOpenKeys = arrSplit[2]
    openKey = arrSplit[1]
  } else {
    defaultOpenKeys = arrSplit[1]
  }
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle(!toggle);
  }
  let role = ReadCookie("role");
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
          selectedKeys={[defaultOpenKeys]}
        >

          <div className="logo"><MenuOutlined onClick={handleClick} /></div>

          {role !== "user" &&
            <Menu.Item
              key="users"
              icon={<UserOutlined />}
            >
              <Link to={`/users`} className="route-link" >
                <span>Users</span>
              </Link>
            </Menu.Item>
          }
          {/* <SubMenu
                key="order"
               // popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-product-grid" />
                    <span>Auction Managment </span>
                  </span>
                }
                
              > */}
              <Menu.Item
            key="auction-management"
            icon={<DeploymentUnitOutlined />}
          >
            <Link to={`/auction-management`} className="route-link">
              <span>Auction Managment</span>
            </Link>
          </Menu.Item>
              {/* </SubMenu> */}
         
        </Menu>
      </Sider>
    </div>
  );
};

export default AppSidebar;