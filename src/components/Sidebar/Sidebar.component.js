import React, {useEffect,useState} from 'react';
import {Drawer, Layout} from "antd";
import {Aside} from "./Aside.component";
import logo from "../../asset/images/logo-sidebar.svg";

export const Sidebar = ({visible, setVisible,collapsed,setCollapsed}) => {
  return (
    <>
      <Layout.Sider
        className="sidebar"
        breakpoint={"lg"}
        width={208}
        theme="dark"
      /*  collapsedWidth={0}*/
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Aside setVisible={setVisible} collapsed={collapsed} />
      </Layout.Sider>
      <Drawer
        width={230}
        title={<img src={logo} alt="logo" />}
        headerStyle={{paddingBottom: 0, border: 'none'}}
        placement="right"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Aside setVisible={setVisible} drawer={true} />
      </Drawer>
    </>
  )
};
