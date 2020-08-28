import React from 'react'
import { Layout } from 'antd';
import Nav from '../Nav/Nav'

const { Content, Footer, Header } = Layout;

const Main = () => {
  return (
    <Layout className="layout">
      <Nav />
      <Content style={{ width: '100vw', height: '100vh' }}>
        <div>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'dodgerblue' }}>Blogger ©2020</Footer>
    </Layout >
  )
}

export default Main