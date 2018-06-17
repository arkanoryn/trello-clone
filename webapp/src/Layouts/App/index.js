import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import Project from '../../Projects/';

const { Header, Content, Footer } = Layout;

const AppLayout = () => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>

    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        <Project.NewProjectForm />
      </div>
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      Trello-clone, by Ark'Anoryn
    </Footer>
  </Layout>
)

export { AppLayout };