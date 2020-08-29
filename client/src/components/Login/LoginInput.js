import React from 'react'
import { GooglePlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';


const LoginInput = () => {
  return (
    <Row justify="center" >
      <Col span={1} >
        <GooglePlusOutlined style={{ color: 'white', fontSize: '42px' }} />
      </Col>
      <Col span={20} offset={3} style={{ fontSize: '25px' }} >
        <a href='http://localhost:5000/auth/google' style={{ color: 'white' }}>
          Sign in
        </a>
      </Col>
    </Row>
  )
}

export default LoginInput