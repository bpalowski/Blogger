import React, { Component } from 'react'
// import Nav from '../Nav/Nav'
import { Card, Row, Col } from 'antd';
import LoginInput from './LoginInput'

import { REACT_APP_NOT_SECRET_CODE } from '../../exportEnv/index'
import { withRouter, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setInitialLogin } from '../../state/actions/auth';

import { getHashParams } from '../../utils/auth'



class Login extends Component {

  componentDidMount() {
    if (!this.props.authenticated) {
      this.verifyAuth()
    }
  }


  verifyAuth() {
    const params = getHashParams(REACT_APP_NOT_SECRET_CODE)
    if (params) {
      this.props.setInitialLogin()
    }
  }

  render() {
    if (this.props.authenticated === true) {
      return <Redirect to="/user" />
    }

    return (
      <>

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

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setInitialLogin };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))