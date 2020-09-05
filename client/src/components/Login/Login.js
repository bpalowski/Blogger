import React, { Component } from 'react'
// import Nav from '../Nav/Nav'
import { Card, Row, Col } from 'antd';
import LoginInput from './LoginInput'

import PasswordAdmin from '../Modal/PasswordAdmin'

import { REACT_APP_NOT_SECRET_CODE, REACT_APP_NOT_SECRET_ADMIN } from '../../exportEnv/index'
import { withRouter, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { setInitialLogin } from '../../state/actions/auth';


import { getHashParams } from '../../utils/auth'
import axios from 'axios'

const styles = {
  rowStyle: {
    paddingTop: 50, height: "100vh", backgroundColor: '#e6e6e6'
  },
  colStyle: {
    paddingTop: 10
  },
  cardStyle: {
    width: 300, marginTop: 250, height: 80, color: "white", backgroundColor: '#de5246'
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      this.verifyAuth()
    }
  }




  verifyAuth() {
    const params = getHashParams(REACT_APP_NOT_SECRET_ADMIN, REACT_APP_NOT_SECRET_CODE)


    if (params === "admin") {
      this.setState({ modal: true })

    }

    if (params === "user") {
      this.props.setInitialLogin()

    }

  }


  view() {

    if (this.state.modal === true) {
      return <PasswordAdmin history={this.props.history} />
    }

    return <Row justify="center" style={styles.rowStyle}>
      <Col style={styles.colStyle}>
        <Card style={styles.cardStyle}>
          <LoginInput />
        </Card>
      </Col>
    </Row>

  }



  render() {
    if (this.props.authenticated === true && this.props.admin === false) {
      return <Redirect to="/user" />
    }

    return this.view()

  }
}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  admin: state.userData.admin,
  blogData: state.bloggerData,
});
const mapDispatchToProps = { setInitialLogin };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))