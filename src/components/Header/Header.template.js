import {MenuOutlined, UserOutlined,MenuUnfoldOutlined,MenuFoldOutlined} from "@ant-design/icons";
import {useState} from 'react'
import {Avatar, PageHeader, Row, Col, Button, Menu, Dropdown, Space} from "antd";
import style from "./Header.module.scss";


export const HeaderTemplate = ({setVisible,collapsed,setCollapsed}) => {
    const logOut = () => {
      console.log('logout')
    }

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const menu = (
        <Menu>
            <Menu.Item key="sub1" title="Navigation One" style={{minWidth:"140px"}}>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1" onClick={logOut}>
                خروج
            </Menu.Item>
        </Menu>

    );
    const {SubMenu} = Menu;
    return (
        <PageHeader className="background-default shadow z-index-1 z-index@l "  >
            <Space>
                <Button
                 /*   type="primary"*/
                    className="toggle"
                    onClick={toggleCollapsed}
                   /* style={{
                        marginBottom: 10,

                    }}*/
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            <h1 className='header-title'>Resume</h1>
            </Space>
              {/*  <div  className="profile text-left" >
                <Dropdown overlay={menu}>
                    <Avatar icon={<UserOutlined/>}></Avatar>
                </Dropdown>
                </div>*/}
        </PageHeader>


    );
};
