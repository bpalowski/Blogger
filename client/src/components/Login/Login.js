import React from 'react'
import Nav from '../Nav/Nav'
import { Card, Row, Col, Typography } from 'antd';
import FormInput from './FormInput'

const { Title } = Typography;

const Login = () => {
  return (
    <>
      <Nav />
      <Row justify="center" style={{ paddingTop: 50, height: "100vh", backgroundColor: '#e6e6e6' }}>
        <Col style={{ paddingTop: 10 }}>
          <Title>Login</Title>
          <Card style={{ textAlign: 'center', width: 485, paddingTop: 50, marginTop: 80, height: 325 }}>
            <FormInput />
          </Card>
        </Col>
      </Row>
    </ >
  )
}

export default Login