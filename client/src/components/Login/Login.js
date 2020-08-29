import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import { Card, Row, Col } from 'antd';
import LoginInput from './LoginInput'
import { REACT_APP_NOT_SECRET_CODE } from '../exports/index'


import { getHashParams } from '../../utils/auth'

// Pick Up

class Login extends Component {
  componentDidMount() {
    this.verifyAuth()
  }
  verifyAuth() {
    const params = getHashParams(REACT_APP_NOT_SECRET_CODE)
    if (params) {
      console.log(true)
    }
  }
  render() {
    return (
      <>
        <Nav />
        <Row justify="center" style={{ paddingTop: 50, height: "100vh", backgroundColor: '#e6e6e6' }}>
          <Col style={{ paddingTop: 10 }}>
            <Card style={{ width: 300, marginTop: 250, height: 80, color: "white", backgroundColor: '#de5246' }}>
              <LoginInput />
            </Card>
          </Col>
        </Row>
      </ >
    )
  }

}

export default Login