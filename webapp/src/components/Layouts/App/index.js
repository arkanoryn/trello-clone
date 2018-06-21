import React from 'react';

import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children, breadcrumb, actions }) => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        {actions}
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
