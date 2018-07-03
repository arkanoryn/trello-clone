import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Input, Layout, Breadcrumb, Row, Menu } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const breadcrumbNameMap = {
  '/projects':     'Projects',
  '/projects/new': 'New',
};

const extraBreadcrumbItems = ({ pathname }, breadcrumbItems) => {
  const pathSnippets = (pathname.split('/').filter((i) => { return i; }));

  return (pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {
            (breadcrumbItems && breadcrumbItems[index]) ?
              breadcrumbItems[index].name : breadcrumbNameMap[url]
          }
        </Link>
      </Breadcrumb.Item>
    );
  }));
};

const setBreadcrumbItems = (location, breadcrumbItems) => {
  return [(
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  )].concat(extraBreadcrumbItems(location, breadcrumbItems));
};

const AppLayout = ({
  location, children, actions, breadcrumbItems,
}) => {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row>
          <div className="search-box">
            <Search
              placeholder="Search..."
              onSearch={() => { /* TODO */ }}
              style={{ width: '100%' }}
            />
          </div>
          <Menu
            mode="horizontal"
            style={{ borderBottom: 'none', lineHeight: '46px', marginTop: 12 }}
            id="nav"
          >
            <Menu.Item key="action">
              action
            </Menu.Item>
          </Menu>
        </Row>
      </Header>

      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {actions &&
          <div style={{ float: 'right', margin: '16px 24px 0 0' }}>
            {actions}
          </div>
        }

        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
          {setBreadcrumbItems(location, breadcrumbItems)}
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
