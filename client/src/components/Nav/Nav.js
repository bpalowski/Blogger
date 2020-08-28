import React from 'react'
import { Row, Col, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const Nav = () => {
  return (
    <Header style={{ backgroundColor: "white" }}>
      <Row>
        <Col span={2}><Link to="/">Blogger</Link></Col>
        <Col span={1} offset={20}><Link to="/login">Login</Link></Col>
      </Row>

    </Header>
  )
}

export default Nav