import React, { Component } from 'react'

import { Card, Row, Col } from 'antd';
import LoginInput from './LoginInput'
import Nav from '../Nav/Nav'



import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { setInitialLogin } from '../../state/actions/auth';




const styles = {
  rowStyle: {
    paddingTop: 20, height: "100vh", backgroundColor: '#e6e6e6'
  },
  colStyle: {

  },
  cardStyle: {
    width: "55vw", padding: "15px", marginTop: "20px", height: "10vh", color: "white", backgroundColor: '#de5246', textAlign: 'center'
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }



  view() {

    return <><Nav /> <Row justify="space-around" style={styles.rowStyle}>

      <Col style={styles.colStyle}>

        <Card style={styles.cardStyle}>
          <LoginInput />
        </Card>

      </Col>

    </Row></>
  }

  render() {

    return this.view()
  }
}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  admin: state.userData.admin,
});
const mapDispatchToProps = { setInitialLogin };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))