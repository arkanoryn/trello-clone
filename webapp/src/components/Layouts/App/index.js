import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children, breadcrumb }) => {
  return (
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
        {breadcrumb &&
          <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            {breadcrumb.map((item) => {
              return (<Breadcrumb.Item key={`key-${item}`}>{item}</Breadcrumb.Item>);
            })}
          </Breadcrumb>
        }

        <div style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        {"Trello-clone, by Ark'Anoryn"}
      </Footer>
    </Layout>
  );
};

export default AppLayout;
