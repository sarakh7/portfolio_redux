import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Tooltip, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import pages from './menu';
import { ConfigProvider } from 'antd';
import Home from '../contents/home/Home';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { META } from '../../../utils/meta';

import 'react-toastify/dist/ReactToastify.css';
import styles from './admin-layout.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from './../../../store/auth/authActions';
import { getPanelLogo } from '../../../store/ui/uiActions';
import Notification from './Notification';

ConfigProvider.config({
  theme: {
    primaryColor: '#5FAD56',
    errorColor: '#B4436C',
  },
});

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState(<Home />);

  const dispatch = useDispatch();

  const {panelLogo} = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(getPanelLogo());

  }, [dispatch])

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <>
      <Helmet>
        <title>{`${META.SiteName} - Admin`}</title>
      </Helmet>

      <Notification />

      <Layout className={styles.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}><img src={panelLogo} alt="logo" /></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
            {
              pages.map(item =>
                item.children ?
                  <Menu.SubMenu key={item.key} className={styles.submenu} icon={item.icon} title={item.name}>
                    {item.children.map(child => <Menu.Item key={child.key} icon={child.icon} onClick={() => setActivePage(child.component)}>{child.name}</Menu.Item>)}
                  </Menu.SubMenu> :
                  <Menu.Item key={item.key} icon={item.icon} onClick={() => setActivePage(item.component)}>{item.name}</Menu.Item>
              )
            }

          </Menu>
        </Sider>
        <Layout className={styles.site_layout}>
          <Header className={classNames(styles.site_layout_background, styles.site_layout_header)} style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: `${styles.trigger}`,
              onClick: toggle,
            })}
            <Tooltip title="Exit">
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: 'Are you sure you want to exit?',
                    icon: <ExclamationCircleOutlined />,
                    okType: 'danger',
                    onOk: () => dispatch(logOutUser())
                  });
                }}
                type='danger'
                shape='circle'
                icon={<LogoutOutlined />}
                className={styles.exitBtn}
              />
            </Tooltip>
          </Header>
          <Content
            className={styles.site_layout_background}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >

            {activePage}
          </Content>
        </Layout>
      </Layout>
    </>

  );

}

export default AdminLayout;