import React from 'react'
import { GooglePlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';



const LoginInput = () => {
  const styles = {
    googleStyle: {
      color: 'white', fontSize: '42px'
    },
    styleCol: {
      fontSize: '25px'
    },
    anchorTag: {
      color: 'white'
    }
  }
  return (
    <Row justify="center" >
      <Col span={1} >
        <GooglePlusOutlined style={styles.googleStyle} />
      </Col>
      <Col span={20} offset={3} style={styles.styleCol}>
        <a href='auth/google' style={styles.anchorTag}>
          Sign in
        </a>
      </Col>
    </Row>
  )
}

export default LoginInput