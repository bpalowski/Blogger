import React from 'react'


import { Layout } from 'antd';
const { Content, Footer } = Layout;

const User = () => {
  return (
    <Layout className="layout">
      <Content style={{ width: '100vw', height: '100vh' }}>
        <div> My Blogs</div>
        <div>All Users</div>
        <div>All Blogs</div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'dodgerblue' }}>Blogger ©2020</Footer>
    </Layout >
  )
}

export default User