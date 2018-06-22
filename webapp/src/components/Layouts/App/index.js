import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const breadcrumbNameMap = {
  '/projects':     'Projects',
  '/projects/new': 'New',
};

const extraBreadcrumbItems = ({ pathname }) => {
  const pathSnippets = (pathname.split('/').filter((i) => { return i; }));

  return (pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  }));
};

const breadcrumbItems = (location) => {
  return [(
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems(location));
};

const AppLayout = ({
  location, children, actions,
}) => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        {actions}
      </Header>

      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
          {breadcrumbItems(location)}
        </Breadcrumb>

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

export default withRouter(AppLayout);
